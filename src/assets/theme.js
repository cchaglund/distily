const orange = '#e06436';
const lightGray = '#F0F0F0';
const red = '#B8001E';

const theme = {
  BottomSection: `
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 50px;
    grid-template-rows: auto;
    grid-template-areas: 
      "left mid right"
  `,
  BottomSectionTwoColumns: `
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 200px;
    grid-template-rows: auto;
    grid-template-areas: 
      "left right"
  `,
  Column: `
    display: flex;
    flex-direction: column;
  `,
  fonts: {
    header1: 'Montserrat ExtraBold',
  },
  colors: {
    blue: '#71cefa',
    green: '#77d873',
    yellow: '#f2de65',
    orange: '#e06436',
    lightOrange: '#F29C35',
    red: '#B8001E',
    purple: '#CC0099',
    black: '#000000',
    darkGray: '#D2D2D2',
    lightGray: lightGray,
    lighterText: '#292929',
    darkerText: '#171717',
    primaryColor: orange,
    secondaryColor: lightGray,
    errorColor: red,
  },
  breakpoints: {
    mobile: 'max-width: 768px',
    tablet: 'max-width: 1000px',
  },
  spacing: {
    tiny: '0.5rem',
    // (smaller is basesize, which is 16px)
    smaller: '1rem',
    small: '1.5rem',
    base: '2rem',
    medium: '2.62rem',
    large: '4rem',
    xlarge: '6rem',
  },
  fontSizes: {
    xsmall: '1.5rem',
    small: '1.75rem',
    normal: '2rem',
    large: '3rem',
    xlarge: '6rem',
  },
};

export default theme;
