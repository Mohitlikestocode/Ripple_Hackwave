import { useState } from "react";
import { cn } from "../../lib/cn.js";

export function Input({
  prefix = null,
  mono = false,
  big = false,
  label = null,
  className,
  value,
  onChange,
  placeholder = "",
  type = "text",
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  return (
    <label className={cn("block w-full", className)}>
      {label && (
        <span className="block font-body text-xs font-semibold uppercase tracking-[0.08em] text-secondary mb-2">
          {label}
        </span>
      )}
      <div
        className={cn(
          "flex items-center bg-void rounded-sm border transition-[border-color,box-shadow] duration-200 ease-out",
          big ? "px-4 py-3.5" : "px-3 py-[9px]",
          focus
            ? "border-accent-blue shadow-[0_0_0_3px_rgba(74,124,255,0.15)]"
            : "border-subtle"
        )}
      >
        {prefix && (
          <span
            className={cn(
              "font-mono text-secondary mr-2",
              big ? "text-lg" : "text-sm"
            )}
          >
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={cn(
            "flex-1 w-full bg-transparent border-none outline-none text-primary placeholder:text-muted",
            mono ? "font-mono font-medium" : "font-body",
            big ? "text-lg" : "text-sm"
          )}
          {...rest}
        />
      </div>
    </label>
  );
}
