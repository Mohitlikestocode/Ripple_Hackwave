import { cn } from "../../lib/cn.js";

const TONES = {
  neutral: { fg: "text-secondary", bg: "bg-elevated",      bd: "border-subtle",                dot: "bg-secondary" },
  blue:    { fg: "text-accent-blue", bg: "bg-accent-blue/10", bd: "border-accent-blue/30",     dot: "bg-accent-blue" },
  cyan:    { fg: "text-accent-cyan", bg: "bg-accent-cyan/10", bd: "border-accent-cyan/30",     dot: "bg-accent-cyan" },
  amber:   { fg: "text-wave-amber",  bg: "bg-wave-amber/10",  bd: "border-wave-amber/30",      dot: "bg-wave-amber" },
  orange:  { fg: "text-wave-orange", bg: "bg-wave-orange/10", bd: "border-wave-orange/30",     dot: "bg-wave-orange" },
  red:     { fg: "text-wave-red",    bg: "bg-wave-red/10",    bd: "border-wave-red/30",        dot: "bg-wave-red" },
  green:   { fg: "text-wave-green",  bg: "bg-wave-green/10",  bd: "border-wave-green/30",      dot: "bg-wave-green" },
};

export function Badge({
  tone = "neutral",
  dot = false,
  mono = false,
  className,
  children,
  ...rest
}) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-[5px] text-xs leading-none whitespace-nowrap border font-medium",
        mono ? "font-mono tracking-normal" : "font-body tracking-[0.01em]",
        t.fg,
        t.bg,
        t.bd,
        className
      )}
      {...rest}
    >
      {dot && <span className={cn("inline-block h-1.5 w-1.5 rounded-full flex-none", t.dot)} />}
      {children}
    </span>
  );
}
