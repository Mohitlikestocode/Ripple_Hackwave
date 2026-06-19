/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#09090b",
        surface: "#111114",
        elevated: "#1a1a1f",
        subtle: "#222228",
        active: "#333340",
        primary: "#e8e8ed",
        secondary: "#8888a0",
        muted: "#55556a",
        accent: { blue: "#4a7cff", cyan: "#22d3ee" },
        wave: {
          amber: "#f59e0b",
          orange: "#f97316",
          red: "#ef4444",
          green: "#22c55e",
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", '"SF Mono"', "Menlo", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.4)",
        md: "0 8px 24px rgba(0,0,0,0.45)",
        lg: "0 24px 64px rgba(0,0,0,0.6)",
        "glow-blue": "0 0 0 1px rgba(74,124,255,0.25), 0 8px 32px rgba(74,124,255,0.30)",
        "glow-amber": "0 0 24px rgba(245,158,11,0.30)",
        "glow-red": "0 0 24px rgba(239,68,68,0.30)",
        "glow-green": "0 0 24px rgba(34,197,94,0.30)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        breathe: "breathe 2.8s ease-in-out infinite",
        "sonar": "sonar 1.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "pop": "pop 500ms cubic-bezier(0.16,1,0.3,1)",
      },
      keyframes: {
        breathe: {
          "0%,100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.06)" },
        },
        sonar: {
          "0%": { transform: "scale(0.4)", opacity: "0.85" },
          "80%": { opacity: "0.06" },
          "100%": { transform: "scale(9)", opacity: "0" },
        },
        pop: {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
