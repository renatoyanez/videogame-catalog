import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: "375px",
        desktop: "1536px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        surface: {
          secondary: "#EEEEEE",
        },
        "header-title": "#585660",
        gray: {
          medium: "#3B3B3B",
        },
      },
      fontSize: {
        "xl": "24px",
        "2xl": "36px",
      },
    },
  },
  plugins: [],
};
export default config;
