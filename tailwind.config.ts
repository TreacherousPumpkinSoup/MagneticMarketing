import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        oxblood: "#771010",
        cream: "#F6F4D2",
        blush: "#d8b8ae",
        beige: "#d7c3aa",
        borderDeep: "#4e1f1f"
      },
      boxShadow: {
        y2k: "6px 6px 0 #4e1f1f"
      },
      fontFamily: {
        seasons: ["The Seasons", "Georgia", "serif"],
        raleway: ["Raleway", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
