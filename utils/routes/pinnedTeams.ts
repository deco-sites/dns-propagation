// deno-lint-ignore-file no-explicit-any
import { getCookies } from "std/http/mod.ts";
import { DECO_LAST_TEAM_COOKIE } from "deco-sites/admin/constants.ts";
import { PINNED_TEAMS_STORAGE_KEY } from "deco-sites/admin/components/utils/usePinnedTeams.ts";
import { parsePinnedTeamsFromCookie } from "deco-sites/admin/components/utils/usePinnedTeams.ts";
import { getTeams } from "deco-sites/admin/clients/supabase/teams.ts";

export const getPinnedTeams = (req: Request) => {
  const cookies = getCookies(req.headers);
  const pinnedTeams = parsePinnedTeamsFromCookie(
    cookies[PINNED_TEAMS_STORAGE_KEY],
  );

  return pinnedTeams;
};

export const sortTeamsFromPinnedteams = (
  teams: Awaited<ReturnType<typeof getTeams>>,
  pinnedTeams: string[],
) => {
  return teams?.toSorted((a, b) => {
    const aIsPinned = pinnedTeams.includes(a.name);
    const bIsPinned = pinnedTeams.includes(b.name);

    // If a is pinned and b is not, a should come first
    if (aIsPinned && !bIsPinned) {
      return -1;
    }

    // If b is pinned and a is not, b should come first
    if (!aIsPinned && bIsPinned) {
      return 1;
    }

    // If both a and b are pinned or both are not pinned, preserve original order
    return 0;
  });
};

export const redirectToLastTeam = (
  req: Request,
  _: Record<any, any>,
) => {
  const cookies = getCookies(req.headers);
  const lastTeam = cookies[DECO_LAST_TEAM_COOKIE];

  if (lastTeam) {
    const firstTeamURLPath = `/teams/${lastTeam}/sites`;
    const teamURL = new URL(firstTeamURLPath, req.url);
    return Response.redirect(teamURL, 307);
  }
};
