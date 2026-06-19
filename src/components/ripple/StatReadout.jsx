import { cn } from "../../lib/cn.js";

const TONES = {
  neutral: "var(--text-primary)",
  green: "var(--wave-green)",
  amber: "var(--wave-amber)",
  red: "var(--wave-red)",
  blue: "var(--accent-blue)",
  orange: "var(--wave-orange)",
};

export function StatReadout({
  label = "",
  value = "",
  unit = null,
  trend = null,
  tone = "neutral",
  icon = null,
  size = "md",
  className,
}) {
  const c = TONES[tone] || TONES.neutral;
  const arrow = trend === "up" ? "↑" : trend === "down" ? "↓" : null;
  const valSize = size === "sm" ? 16 : 24;
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="inline-flex items-center gap-1.5 font-body text-xs font-medium text-secondary">
        {icon && <span className="text-[13px]">{icon}</span>}
        {label}
      </span>
      <span
        className="font-mono font-medium inline-flex items-baseline gap-1.5 leading-[1.1]"
        style={{ color: c, fontSize: valSize }}
      >
        {value}
        {unit && (
          <span className="text-secondary" style={{ fontSize: Math.round(valSize * 0.55) }}>
            {unit}
          </span>
        )}
        {arrow && (
          <span style={{ color: c, fontSize: Math.round(valSize * 0.7) }}>{arrow}</span>
        )}
      </span>
    </div>
  );
}
