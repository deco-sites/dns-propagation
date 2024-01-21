export const isUserFromDeco = (user?: { email?: string }) =>
  Boolean(user?.email?.endsWith("@deco.cx"));
