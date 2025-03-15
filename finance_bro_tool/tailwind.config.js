/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        primary: '#0466C8',
        secondary: '#2EC4B6',
        danger: '#e3342f',  
      }
    },
  },
  plugins: [],
}

