/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0d1321",
        primary: "#28334d",
        secondary: "#17223a",
        accent: "#7d2e68",
        text: "white",
        "secondary-text": "#B3BFB8",
        danger: "#ff4747",
      },
    },
  },
  plugins: [],
};
