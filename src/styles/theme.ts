const colors = {
  main: 'hsl(0, 0%, 10%)',
  secondary: 'hsl(0, 0%, 95%)',

  dark: 'hsl(0, 0%, 2%)',
  gray100: 'hsl(0, 0%, 70%)',
};

const theme = {
  ...colors,

  font: {
    weight: {
      light: 400,
      bold: 700,
    },
    size: {
      m: '1.3rem',
      l: '1.6rem',
    },
  },

  borderRadius: '5px',
};

export default theme;