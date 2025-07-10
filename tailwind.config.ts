import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        "brand-primary": "#0D9488", // Teal 600
        "brand-primary-focus": "#0F766E", // Teal 700
        "brand-primary-content": "#ffffff",
        "brand-secondary": "#F97316", // Orange 500
        "base-100": "#ffffff",
        "base-200": "#f8fafc", // Slate 50
        "base-300": "#e2e8f0", // Slate 200
        content: "#334155", // Slate 700
        "content-strong": "#0f172a", // Slate 900
        success: "#16a34a", // Green 600
        warning: "#f59e0b", // Amber 500
        error: "#dc2626", // Red 600
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
