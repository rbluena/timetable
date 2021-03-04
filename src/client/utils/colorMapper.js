const colors = {
  magenta: {
    name: 'magenta',
    color: '#c41d7f',
    bgColor: '#fff0f6',
    borderColor: '#ffadd2',
  },
  red: {
    name: 'red',
    color: '#cf1322',
    bgColor: '#fff1f0',
    borderColor: '#ffa39e',
  },
  orange: {
    name: 'orange',
    color: '#d46b08',
    bgColor: '#fff7e6',
    borderColor: '#ffd591',
  },
  gold: {
    name: 'gold',
    color: '#d48806',
    bgColor: '#fffbe6',
    borderColor: '#ffe58f',
  },
  lime: {
    name: 'lime',
    color: '#7cb305',
    bgColor: '#fcffe6',
    borderColor: '#eaff8f',
  },
  green: {
    name: 'green',
    color: '#389e0d',
    bgColor: '#f6ffed',
    borderColor: '#b7eb8f',
  },
  cyan: {
    name: 'cyan',
    color: '#08979c',
    bgColor: '#e6fffb',
    borderColor: '#87e8de',
  },
  blue: {
    name: 'blue',
    color: '#096dd9',
    bgColor: '#e6f7ff',
    borderColor: '#91d5ff',
  },
  geekblue: {
    name: 'geekblue',
    color: '#1d39c4',
    bgColor: '#f0f5ff',
    borderColor: '#adc6ff',
  },
  purple: {
    name: 'purple',
    color: '#531dab',
    bgColor: '#f9f0ff',
    borderColor: '#d3adf7',
  },
};

export default colors;

/**
 * Grab bg color, text color and border colors.
 *
 * @param {String} key
 * @return {Object}
 */
export const getColor = (key) => colors[key];

/**
 * It returns random color from the list
 */
export const generateRandomColor = () => {
  const keys = Object.keys(colors);
  const count = keys.length;

  const random = Math.floor(Math.random() * count);
  const selected = keys[random];
  return colors[selected];
};
