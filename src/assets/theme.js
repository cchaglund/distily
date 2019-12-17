const Color = require('color');

const theme = {
  SmallButton: `
    padding: 0.4rem 1rem;
    text-align: start;
    width: 100%;
    background: none;
    color: inherit;
    border: none;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  `,
  WideButton: `
    padding: 0.2rem 1rem;
    text-align: start;
    width: 100%;
    background: none;
    color: inherit;
    border: none;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  `,
  BottomSection: `
    margin-top: 2rem;
    margin-bottom: 2rem;
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 200px;
    grid-template-rows: auto;
    grid-template-areas: 
      "left right"
  `,
  BottomSectionFourColumns: `
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 50px;
    grid-template-rows: 1fr;
    grid-template-areas: 
      "left mid-left mid-right right"
  `,
  BottomSectionFull: `
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 200px;
    grid-template-rows: auto;
    grid-template-areas: 
      "full"
  `,
  Column: `
    display: flex;
    flex-direction: column;
  `,
  fonts: {
    header1: 'Montserrat ExtraBold',
  },
  colors: {
    purple: {
      color: '#F6EFFF',
      hover: Color('#F6EFFF').darken(0.05).hsl().string()
    },
    green: {
      color: '#D1FFDB',
      hover: Color('#D1FFDB').darken(0.05).hsl().string()
    },
    yellow: {
      color: '#FDFFD1',
      hover: Color('#FDFFD1').darken(0.05).hsl().string()
    },
    orange: {
      color: '#FF9277',
      hover: Color('#FF9277').darken(0.05).hsl().string()
    },
    blue: {
      color: '#F2F9FF',
      hover: Color('#A0CFF7').darken(0.05).hsl().string()
    },
    red: {
      color: '#edb1b6',
      hover: Color('#A0CFF7').darken(0.05).hsl().string()
    },
    black: {
      color: '#485050',
      hover: Color('#485050').lighten(0.2).hsl().string()
    }
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
