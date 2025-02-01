import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

      },
      dropShadow: {
        'top-right-glow': ['0 -2px 10px rgba(255, 255, 255, 0.5)'] // Adjust values as needed
      }
    },
  },
  plugins: [],
} satisfies Config;
