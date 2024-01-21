// deno-lint-ignore-file no-explicit-any
import { Manifest } from "$fresh/server.ts";
import {
  Handler,
  HandlerContext,
  Handlers,
  RouteModule,
} from "$fresh/src/server/types.ts";
import { AdminState } from "deco-sites/admin/loaders/adminData.ts";
import { METHODS } from "https://deno.land/x/rutt@0.0.13/mod.ts";
import { ALTERNATIVE_ADMIN_HOSTNAME } from "./loaders/adminPaths.ts";

const hasAnyMethod = (obj: Record<string, any>): boolean => {
  for (const method of METHODS) {
    if (obj[method]) {
      return true;
    }
  }
  return false;
};

const withPattern = (pattern: string) =>
(
  h: Handler<any, any>,
): Handler<any, AdminState> => {
  return (req: Request, ctx: HandlerContext<any, AdminState>) => {
    ctx.state.routePattern = pattern;
    return h(req, ctx);
  };
};

export const setRoutePattern = <T extends Manifest>(
  man: T,
) => {
  const { routes, ...rest } = man;
  const newRoutes: Manifest["routes"] = {};
  for (const [_routeKey, route] of Object.entries(routes)) {
    const routeKey = _routeKey as keyof T["routes"] & string;
    if (!routeKey.endsWith("_middleware.ts")) {
      const setPattern = withPattern(routeKey);
      const routeAsMod = route as T["routes"][string];
      const handler = routeAsMod.handler;
      const handlerIsFunc = typeof handler === "function";
      const defaultIsFunc =
        typeof (routeAsMod as RouteModule).default === "function";
      if (handlerIsFunc) {
        newRoutes[routeKey] = {
          ...routeAsMod,
          handler: setPattern(handler as any),
        };
      } else if (typeof handler === "object" && hasAnyMethod(handler)) {
        const newHandler: Handlers<any, any> = {};
        for (const [method, methodHandler] of Object.entries(handler)) {
          newHandler[method as typeof METHODS[number]] = setPattern(
            methodHandler,
          );
        }
        newRoutes[routeKey] = { ...routeAsMod, handler: newHandler };
      } else if (defaultIsFunc && handler === undefined) {
        newRoutes[routeKey] = {
          ...routeAsMod,
          handler: (_req: Request, ctx: HandlerContext<any, AdminState>) => {
            ctx.state.routePattern = routeKey;
            return ctx.render();
          },
        };
      } else {
        newRoutes[routeKey] = route;
      }
    } else {
      newRoutes[routeKey] = route;
    }
  }
  return { ...rest, routes: newRoutes };
};

export const settingsPage = (
  site: string,
) => {
  return `https://${ALTERNATIVE_ADMIN_HOSTNAME}/sites/${site}/settings?tab=0`;
};

export const adminPage = `https://${ALTERNATIVE_ADMIN_HOSTNAME}/admin`;
