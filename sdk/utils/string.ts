/**
 * Capitalizes the given string
 * @returns the capitalized version of the given string
 */
export const capitalize = (str?: string) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : str;
