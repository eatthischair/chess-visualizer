/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        GreatVibes: ["Great Vibes", "cursive"],
      },
    },
  },
  plugins: [require("daisyui")],
};
