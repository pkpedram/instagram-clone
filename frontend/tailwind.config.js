/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        selphRed: '#DD1724',
        selphDark: '#242424',
        main: {
          blue: '#1877F2',
          pink: '#C913B9',
          red: '#F9373F',
          yellow: '#FECD00'
        }
      },
    },
  },
  plugins: [],
}
