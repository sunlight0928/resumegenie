/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        "blue-light": "rgb(241, 238, 254)",
        "blue-light-hover": "rgb(234, 230, 253)",
        "blue-light-active": "rgb(211, 204, 251)",
        "blue-normal": "rgb(112, 89, 243)",
        "blue-normal-hover": "rgb(101, 80, 219)",
        "blue-normal-active": "rgb(90, 71, 194)",
        "blue-dark": "rgb(84, 67, 182)",
        "blue-dark-hover": "rgb(67, 53, 146)",
        "blue-dark-active": "rgb(50, 40, 109)",
        "blue-darker": "rgb(39, 31, 85)",
        "white-light": "rgb(253, 253, 253)",
        "white-light-hover": "rgb(251, 251, 251)",
        "white-light-active": "rgb(247, 247, 247)",
        "white-normal": "rgb(230, 230, 230)",
        "white-normal-hover": "rgb(207, 207, 207)",
        "white-normal-active": "rgb(184, 184, 184)",
        "white-dark": "rgb(173, 173, 173)",
        "white-dark-hover": "rgb(138, 138, 138)",
        "white-dark-active": "rgb(103, 103, 103)",
        "white-darker": "rgb(81, 81, 81)",
        "black-light": "rgb(230, 230, 230)",
        "black-light-hover": "rgb(217, 217, 217)",
        "black-light-active": "rgb(176, 176, 176)",
        "black-normal": "rgb(0, 0, 0)",
        "black-normal-hover": "rgb(0, 0, 0)",
        "black-normal-active": "rgb(0, 0, 0)",
        "black-dark": "rgb(0, 0, 0)",
        "black-dark-hover": "rgb(0, 0, 0)",
        "black-dark-active": "rgb(0, 0, 0)",
        "black-darker": "rgb(0, 0, 0)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
