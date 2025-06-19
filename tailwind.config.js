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
        matchaGreen: '#4E6813',
        midnightBlack: '#090F15',
        boxBackground: '#F2f2f2',
        richEarthBrown: '#8A7356',
        deepExpressoClay: '#5B4C3A'
      }
    },
  },
  plugins: [],
}

