export function sanitizeCookieName(name: string) {
  // Remove leading and trailing whitespaces
  name = name.trim();

  // Replace invalid characters with underscores
  name = name.replace(/[^a-zA-Z0-9\-_]/g, "_");

  return name;
}
