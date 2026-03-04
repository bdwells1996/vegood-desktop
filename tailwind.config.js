/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./stories/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ── Primary (Green) ──────────────────────────
        primary: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
          950: "#052E16",
        },

        // ── Neutral (Slate) ─────────────────────────
        neutral: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#020617",
        },

        // ── Semantic ────────────────────────────────
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",

        // ── Surface (Light & Dark Mode) ─────────────
        background: {
          DEFAULT: "#FFFFFF",
          secondary: "#F8FAFC",
          tertiary: "#F1F5F9",
          dark: "#0F172A",
          "dark-secondary": "#1E293B",
          "dark-tertiary": "#334155",
        },

        // ── Text ────────────────────────────────────
        content: {
          primary: "#0F172A",
          secondary: "#475569",
          tertiary: "#94A3B8",
          inverse: "#FFFFFF",
          "dark-primary": "#F8FAFC",
          "dark-secondary": "#CBD5E1",
          "dark-tertiary": "#64748B",
        },

        // ── Border ──────────────────────────────────
        border: {
          DEFAULT: "#E2E8F0",
          strong: "#CBD5E1",
          dark: "#334155",
          "dark-strong": "#475569",
        },
      },

      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },

      fontSize: {
        overline: ["11px", { lineHeight: "16px", letterSpacing: "0.08em" }],
        caption: ["12px", { lineHeight: "16px", letterSpacing: "0.02em" }],
        body: ["14px", { lineHeight: "20px" }],
        "body-lg": ["16px", { lineHeight: "24px" }],
        h3: ["18px", { lineHeight: "24px" }],
        h2: ["20px", { lineHeight: "28px" }],
        h1: ["24px", { lineHeight: "32px" }],
        display: ["30px", { lineHeight: "36px" }],
      },

      spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        base: "16px",
        lg: "20px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "40px",
        "4xl": "48px",
        "5xl": "64px",
      },

      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        full: 9999,
      },

      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
        "card-md": "0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)",
        "card-lg": "0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.05)",
        button: "0 1px 2px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
