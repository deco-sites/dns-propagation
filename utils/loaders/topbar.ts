// deno-lint-ignore-file no-explicit-any
import { Manifest } from "deco-sites/admin/apps/admin.ts";
import type {
  Option,
} from "deco-sites/admin/components/layout/topbar/TopbarMenu.tsx";
import { Invoke } from "deco/utils/invoke.types.ts";

type LoaderAction<InvokableKey extends string> =
  & Invoke<Manifest, InvokableKey, any>
  & { id: string };

export type LoadTeamOptionsAction = LoaderAction<
  "deco-sites/admin/loaders/teams/loadTeamOptions.ts"
>;

const TEAM_MENU_ID = "teams";

export const getTeamOptionsAction = (options: Option[], teamId?: string) => ({
  key: "deco-sites/admin/loaders/teams/loadTeamOptions.ts",
  props: {
    options,
    teamId,
  },
  id: TEAM_MENU_ID,
} satisfies LoadTeamOptionsAction);

export type LoadSiteOptionsAction = LoaderAction<
  "deco-sites/admin/loaders/sites/loadSiteOptions.ts"
>;

export const getTeamMenuId = (teamId: string | number) => `t_${teamId}`;
export const getLoadSiteOptionsAction = (
  { options, team, sitename }: {
    options: Option[];
    team: { id: string | number; name: string };
    sitename?: string;
  },
) => ({
  key: "deco-sites/admin/loaders/sites/loadSiteOptions.ts",
  props: {
    team,
    sitename,
    options,
  },
  id: getTeamMenuId(team.id),
} satisfies LoadSiteOptionsAction);
