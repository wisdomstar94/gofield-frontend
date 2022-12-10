/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.65rem',
      },
      colors: {
        'blue-a': '#0c8af5',
        'green-a': '#48c986',
        'orange-a': '#ff6247',
        'black-a': '#1e2238',
        'black-b': '#374553',
        'gray-a': '#e9ebee',
        'gray-b': '#646f7c',
        'kakao-color': '#F9DD4A',
        'naver-color': '#56BC3D',
      },
      backgroundColor: {
        'gray-a': '#e9ebee',
        'gray-b': '#646f7c',
        'black-b': '#374553',
        'kakao-color': '#F9DD4A',
        'naver-color': '#56BC3D',
      },
    },
  },
  plugins: [],
}