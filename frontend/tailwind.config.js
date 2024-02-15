/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#F9FBFF",
          200: "#E8EFFF",
          300: "#A6BFFF",
          400: "#7AA0FF",
          500: "#2160FF",
          DEFAULT: "#2160FF",
        },
        error: "#DC0000",
        dark: "#303030",
        light: "#F0F0F0",
        secondary: {
          100: "#A7A7A7",
          200: "#666666",
          DEFAULT: "#666666",
        },
      },
    },
  },
  plugins: [],
};
