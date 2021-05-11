/* eslint-disable global-require */
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
    extend: {
      typography: {
        sm: {
          css: {
            h1: {
              marginTop: 0,
            },
            h2: {
              marginTop: 0,
            },
            h3: {
              marginTop: 0,
            },
            h4: {
              marginTop: 0,
            },
            p: {
              marginTop: 0,
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
