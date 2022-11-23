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
        'black-b': '#374553',
        'gray-a': '#e9ebee',
        'gray-b': '#646f7c',
      },
      backgroundColor: {
        'gray-a': '#e9ebee',
        'gray-b': '#646f7c',
        'black-b': '#374553',
      },
    },
  },
  plugins: [],
}