import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontFamily: {
      terminal: ["Menlo", "Monaco", "Consolas", "Courier New", "monospace"],
      digital: ['"digital-7"', "monospace"],
      sans: ['"Noto Sans JP"', "sans-serif"],
      helvetica: ["HelveticaNeueLTStd-Lt", "Helvetica", "Arial", "sans-serif"],
    },
  },
  plugins: [],
};
export default config;
