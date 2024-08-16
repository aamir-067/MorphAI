/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#fff",
        background: "#0C1419",
        backgroundContainer: "#1D192B",
        icon: "#fff",
        error: "#B3261E",
        buttonBackground: "#322F35",
        outline: "#65558F",
        accentBlue: "#326AFD",
      }
    },
  },
  plugins: [],
}

