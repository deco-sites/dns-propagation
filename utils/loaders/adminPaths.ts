export const generateHrefWithPrefix =
  (prefix: string) => (team: string | number, ctx: string | undefined = "") =>
    `${prefix}/${team}${ctx ? `/${ctx}` : ""}`;

export const V0_ADMIN_HOSTNAME = "v0-admin.deco.cx";
export const ALTERNATIVE_ADMIN_HOSTNAME = "admin.deco.cx";
export const isAlternativeAdmin = (hostname?: string) =>
  (hostname ?? window?.location?.hostname) === ALTERNATIVE_ADMIN_HOSTNAME;

export const PLAY_HOSTNAME = "play.deco.cx";
