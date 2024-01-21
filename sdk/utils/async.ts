/**
 * Sleeps the given amount of time in milliseconds.
 */
export const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
