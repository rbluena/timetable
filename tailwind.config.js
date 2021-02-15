const {
  red,
  white,
  blue,
  blueGray,
  pink,
  cyan,
} = require('tailwindcss/colors');

module.exports = {
  darkMode: false, // or 'media' or 'class'
  purge: {
    layers: ['components', 'pages'],
    content: ['./src/client/**/*.jsx'],
  },
  theme: {
    fontFamily: {
      sans: ['Source Sans Pro', 'Arial', 'sans-serif'],
      secondary: ['Ubuntu', 'Arial', 'sans-serif'],
    },
    colors: {
      primary: blue,
      secondary: pink,
      tertiary: cyan,
      neutral: blueGray,
      danger: red,
      success: blue,
      white,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
