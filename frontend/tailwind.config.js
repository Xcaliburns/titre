/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'sans': ['nunito-sans-serif', 'merriweather-sans-light', 'sans-serif'],
      'bold':['nunito-sans-bold','sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}