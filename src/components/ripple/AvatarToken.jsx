import { motion } from "framer-motion";
import { cn } from "../../lib/cn.js";

const WAVE_RING = {
  amber: "border-wave-amber shadow-glow-amber",
  orange: "border-wave-orange shadow-[0_0_18px_rgba(249,115,22,0.45)]",
  red: "border-wave-red shadow-glow-red",
  green: "border-wave-green shadow-glow-green",
};

function vulnRing(v) {
  if (v == null) return "border-active";
  if (v >= 70) return "border-wave-red";
  if (v >= 40) return "border-wave-amber";
  return "border-wave-green";
}

export function AvatarToken({
  emoji = "🙂",
  size = 56,
  vulnerability = null,
  wave = null,
  pulse = false,
  cracked = false,
  label = null,
  className,
}) {
  const ringClass = wave ? WAVE_RING[wave] : vulnRing(vulnerability);
  const inner = size - 8;
  return (
    <div className={cn("inline-flex flex-col items-center gap-1.5", className)}>
      <motion.div
        animate={pulse ? { scale: [1, 1.06, 1] } : { scale: 1 }}
        transition={pulse ? { duration: 2.8, repeat: Infinity, ease: "easeInOut" } : { duration: 0.5 }}
        className={cn(
          "rounded-full p-[3px] box-border border-2 transition-[border-color,box-shadow] duration-500 ease-out",
          cracked ? "border-dashed" : "border-solid",
          ringClass
        )}
        style={{ width: size, height: size }}
      >
        <div
          className="rounded-full flex items-center justify-center leading-none"
          style={{
            width: inner,
            height: inner,
            background: "radial-gradient(circle at 50% 38%, #20202a, #0c0c0f)",
            fontSize: Math.round(size * 0.46),
          }}
        >
          {emoji}
        </div>
      </motion.div>
      {label && (
        <span
          className="font-body text-[11px] font-medium text-primary text-center"
          style={{ maxWidth: size + 28 }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
