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
        hoboc: "#1F9ECE",
        "hoboc-dark": "#0076A6",
        "custom-blue-for-hero-bg": "#EFFAFD",
        "main-bg-courses": "#F5F8FA",
        "main-bg": "#FEFEFE",
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"), // ← needed for .prose
  ],
};

export default config;
