import { badRequest, FnContext } from "$live/mod.ts";
import { AuthState } from "deco-sites/admin/middlewares/withAuth.ts";
import { isUserFromDeco } from "deco-sites/admin/loaders/adminData.ts";

import { Sites } from "deco-sites/admin/clients/supabase/sites.ts";
import type { Manifest } from "deco-sites/admin/runtime.ts";

export const convertDomain = (domain: string) =>
  (domain.startsWith("www.")) ? domain.slice(4) : domain;

export function validateQuery(
  site: Partial<Sites> | null,
  hostname: string,
  ctx: FnContext<
    AuthState,
    Manifest
  >,
): boolean {
  const isLiveCall = Boolean(ctx);
  const isDecoUser = ctx?.user && isUserFromDeco(ctx.user);
  const isUserFromSite = ctx && ctx.supabaseClient && site;

  if (isLiveCall && !isDecoUser && !isUserFromSite) {
    badRequest({ message: "Data not found" });
    return false;
  }

  if (!site) {
    badRequest({ message: "Data not found" });
    return false;
  }

  if (!isDecoUser && isUserFromSite) {
    if (
      !site.domains ||
      !site.domains.filter((domain) => domain.domain === hostname)
        .length
    ) {
      badRequest({ message: "Host not found" });
      return false;
    }
    if (hostname.includes("localhost")) {
      badRequest({
        message: "Are you sure that you want to do that at localhost?",
      });
      return false;
    }
  }
  return true;
}
