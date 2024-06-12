/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0d1321",
        primary: "#293c66",
        secondary: "#17223a",
        accent: "#7d2e68",
        text: "white",
        "secondary-text": "gray",
        danger: "#ff4747",
      },
    },
  },
  plugins: [],
};
