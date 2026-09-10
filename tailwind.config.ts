import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-elevated": "var(--background-elevated)",
        surface: "var(--surface)",
        "surface-strong": "var(--surface-strong)",
        foreground: "var(--foreground)",
        "foreground-muted": "var(--foreground-muted)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-2": "var(--accent-2)",
        border: "var(--border)",
        ring: "var(--ring)",
        line: "var(--line)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        glow: "var(--shadow-glow)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
    },
  },
  plugins: [],
};

export default config;
