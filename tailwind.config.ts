import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        morado: {
          950: "#230B3B",
          900: "#35105D",
          700: "#5B2D90",
          600: "#7240A8",
        },
        amarillo: "#FFD400",
        tinta: "#151515",
      },
      borderRadius: {
        premium: "2.25rem",
      },
      boxShadow: {
        premium: "0 28px 80px rgba(35, 11, 59, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;

