import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Outfit"', "system-ui", "sans-serif"],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
      },
      colors: {
        bg: "#FAFAFA",
        fg: "#111111",
        muted: "#6B6B6B",
        border: "#E5E5E5",
        accent: "#16A34A",
        "live-red": "#DC2626",
      },
      borderRadius: {
        DEFAULT: "8px",
      },
      boxShadow: {
        none: "none",
      },
    },
  },
  plugins: [],
};
export default config;
