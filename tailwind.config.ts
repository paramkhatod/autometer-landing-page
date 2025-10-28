import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E6F0FF",
          100: "#CCE0FF",
          500: "#0066FF",
          600: "#0052CC",
          900: "#003D99",
        },
        neutral: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          500: "#A3A3A3",
          700: "#404040",
          900: "#171717",
        },
        success: {
          500: "#10B981",
          600: "#059669",
        },
        warning: {
          500: "#F59E0B",
        },
        error: {
          500: "#EF4444",
        },
      },
      backgroundColor: {
        page: "#FAFAFA",
        surface: "#FFFFFF",
        "surface-hover": "#FEFEFE",
      },
      fontFamily: {
        sans: ["'Inter'", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "sans-serif"],
        mono: ["'SF Mono'", "'Monaco'", "'Courier New'", "monospace"],
      },
      fontSize: {
        hero: ["64px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        title: ["48px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        subtitle: ["32px", { lineHeight: "1.3" }],
        large: ["20px", { lineHeight: "1.6" }],
        body: ["16px", { lineHeight: "1.5" }],
        small: ["14px", { lineHeight: "1.5" }],
        caption: ["12px", { lineHeight: "1.4", letterSpacing: "0.01em" }],
      },
      spacing: {
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "6": "24px",
        "8": "32px",
        "12": "48px",
        "16": "64px",
        "24": "96px",
        "32": "128px",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        full: "9999px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
        modal: "0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)",
        focus: "0 0 0 3px rgba(0, 102, 255, 0.3)",
        "card-branded": "0 1px 3px rgba(0, 102, 255, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)",
      },
      transitionDuration: {
        fast: "200ms",
        base: "250ms",
        slow: "300ms",
        slower: "500ms",
      },
      transitionTimingFunction: {
        "out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out": "cubic-bezier(0.45, 0, 0.55, 1)",
        "bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "butter": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [],
};

export default config;
