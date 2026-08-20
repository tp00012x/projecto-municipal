/**
 * Strip wrapping quotes from proposal titles for cleaner UI.
 */
export function getDisplayTitle(title: string) {
  const trimmed = title.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("“") && trimmed.endsWith("”"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}
