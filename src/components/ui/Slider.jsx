import { cn } from "../../lib/cn.js";

const TONES = {
  blue: "#4a7cff",
  amber: "#f59e0b",
  cyan: "#22d3ee",
};

export function Slider({
  min = 1,
  max = 10,
  step = 1,
  value = 5,
  onChange,
  tone = "blue",
  label = null,
  showValue = true,
  className,
}) {
  const fill = TONES[tone] || TONES.blue;
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-baseline mb-2">
          {label && <span className="font-body text-[13px] text-secondary">{label}</span>}
          {showValue && (
            <span className="font-mono text-[13px] font-medium" style={{ color: fill }}>
              {value}
            </span>
          )}
        </div>
      )}
      <input
        type="range"
        className="ripple-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        style={{
          background: `linear-gradient(to right, ${fill} 0%, ${fill} ${pct}%, var(--border-active) ${pct}%, var(--border-active) 100%)`,
          ["--thumb"]: fill,
        }}
      />
    </div>
  );
}
