import { motion } from "framer-motion";
import { cn } from "../../lib/cn.js";

const SIZES = {
  sm: "px-4 py-[7px] text-[13px] gap-1.5",
  md: "px-[22px] py-[10px] text-sm gap-2",
  lg: "px-8 py-[13px] text-base gap-2.5",
};

const VARIANTS = {
  primary:
    "bg-accent-blue text-white border border-accent-blue hover:shadow-glow-blue",
  outline:
    "bg-transparent text-accent-blue border border-accent-blue hover:bg-accent-blue/10",
  ghost:
    "bg-transparent text-secondary border border-subtle hover:border-active hover:text-primary",
  danger:
    "bg-transparent text-wave-red border border-transparent hover:bg-wave-red/10",
};

export function Button({
  variant = "primary",
  size = "md",
  glow = false,
  pulse = false,
  disabled = false,
  iconLeft,
  iconRight,
  className,
  children,
  ...rest
}) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-body font-semibold leading-none tracking-tight",
        "transition-[box-shadow,background,border-color] duration-200 ease-out",
        SIZES[size],
        VARIANTS[variant],
        disabled && "opacity-40 cursor-not-allowed",
        glow && variant === "primary" && !disabled && "hover:shadow-glow-blue",
        pulse && !disabled && "ripple-pulse",
        className
      )}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
      {pulse && (
        <style>{`@keyframes ripple-pulse-kf{0%,100%{box-shadow:0 0 0 0 rgba(74,124,255,0)}50%{box-shadow:0 0 0 6px rgba(74,124,255,0.12),0 8px 32px rgba(74,124,255,0.30)}}.ripple-pulse{animation:ripple-pulse-kf 2.4s ease-in-out infinite}`}</style>
      )}
    </motion.button>
  );
}
