/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {},
      extend: {
        gridTemplateColumns: {
          '1/5': '1fr 5fr',
        },
      },
    },
    plugins: [],
  };