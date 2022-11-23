/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-a': '#0c8af5',
        'green-a': '#48c986',
        'orange-a': '#ff6247',
        'black-a': '#1e2238',
        'gray-a': '#e9ebee',
      },
      backgroundColor: {
        'gray-a': '#e9ebee',
      },
    },
  },
  plugins: [],
}