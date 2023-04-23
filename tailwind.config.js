// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  variants: {
    extend: {
      // ...
     backgroundOpacity: ['active'],
    }
  },
  content: ["./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        '84': '21rem',
        '90': '22rem',
        '93': '23rem',

      },
    },
  },
  plugins: [require("daisyui")],
};
