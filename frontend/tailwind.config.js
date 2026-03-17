/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2463eb",
        "background-light": "#f6f6f8",
        "background-dark": "#111621",
        success: "#10b981",
      },
      fontFamily: {
        display: ["Inter"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
