import { Github } from "lucide-react";
import { cn } from "../../lib/cn.js";

export const REPO_URL = "https://github.com/Mohitlikestocode/Ripple_Hackwave";

/**
 * Subtle pill linking to the GitHub repo. Icon-only at small size, label
 * appears beside it from `md` upward. Always opens in a new tab.
 */
export function GithubButton({ size = "md", label = "GitHub", className }) {
  const compact = size === "sm";
  return (
    <a
      href={REPO_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="View source on GitHub"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-subtle bg-surface/70 backdrop-blur",
        "text-secondary hover:text-primary hover:border-active transition-colors",
        "font-body font-medium",
        compact ? "h-8 px-3 text-xs" : "h-9 px-3.5 text-[13px]",
        className
      )}
    >
      <Github className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}
