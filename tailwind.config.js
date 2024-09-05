/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}","./*.html"],
  theme: {
    extend: {
      fontFamily: {
        primary : ["Cabin", "sans-serif"]
      }
    },
  },
  plugins: [],
}

