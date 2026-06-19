import { useState } from "react";
import { cn } from "../../lib/cn.js";

const GLOW_BORDER = {
  amber: "border-wave-amber",
  orange: "border-wave-orange",
  red: "border-wave-red",
  green: "border-wave-green",
  blue: "border-accent-blue",
  cyan: "border-accent-cyan",
};

const GLOW_SHADOW = {
  amber: "shadow-glow-amber",
  red: "shadow-glow-red",
  green: "shadow-glow-green",
  blue: "shadow-glow-blue",
};

export function Card({
  interactive = false,
  glow = null,
  elevated = false,
  padding = "p-6",
  className,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={style}
      className={cn(
        "rounded-md border transition-[transform,border-color,box-shadow] duration-200 ease-out",
        elevated ? "bg-elevated" : "bg-surface",
        padding,
        glow ? GLOW_BORDER[glow] : "border-subtle",
        interactive && "cursor-pointer",
        interactive && hover && !glow && "-translate-y-1 border-active shadow-md",
        interactive && hover && glow && `-translate-y-1 ${GLOW_SHADOW[glow] || ""}`,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
