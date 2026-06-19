/**
 * Tiny classnames helper. Keeps JSX tidy without pulling clsx in for two lines.
 */
export function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}
