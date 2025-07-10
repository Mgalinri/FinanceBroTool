/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
module.exports = {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}",
     flowbite.content(),
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
  plugins: [
    flowbite.plugin(),
  ],
}

