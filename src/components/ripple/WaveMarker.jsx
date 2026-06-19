import { cn } from "../../lib/cn.js";

const TONE = {
  amber: "var(--wave-amber)",
  orange: "var(--wave-orange)",
  red: "var(--wave-red)",
  green: "var(--wave-green)",
};

export function WaveMarker({ number = 1, title = "", tone = null, active = false, className }) {
  const auto = number === 1 ? "amber" : number === 2 ? "orange" : "red";
  const t = tone || auto;
  const c = TONE[t];
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className="font-mono text-xs font-semibold rounded-sm px-1.5 py-0.5 leading-[1.4] border"
        style={{
          color: active ? "#0c0c0f" : c,
          background: active ? c : "transparent",
          borderColor: c,
        }}
      >
        {String(number).padStart(2, "0")}
      </span>
      <span
        className="font-mono text-[11px] font-medium uppercase tracking-[0.16em]"
        style={{ color: c }}
      >
        Wave {number}
      </span>
      {title && <span className="font-body text-[13px] text-secondary">· {title}</span>}
    </div>
  );
}
