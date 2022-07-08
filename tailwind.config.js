/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./scripts/*.js"],
  theme: {
    screens: {
      sm: "480px",
      md: "712px",
      lg: "976px",
      xl: "1440px"
    },
    extend: {
      colors: {
        orange: "hsl(26, 100%, 55%)",
        paleOrange: "hsl(25, 100%, 94%)",
        veryDarkBlue: "hsl(220, 13%, 13%)",
        darkGrayishBlue: "hsl(219, 9%, 45%)",
        grayishBlue: "hsl(220, 14%, 75%)",
        lightGrayishBlue: "hsl(223, 64%, 98%)",
      },
      fontFamily: {
        primary: ["Kumbh Sans", "sans-serif"],
        seconddary: ["Poppins", "sans-serif"]
      }
    },
  },
  plugins: [],
}
