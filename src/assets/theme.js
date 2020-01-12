const Color = require('color');

const theme = {
  SmallButton: `
    padding: 0.4rem 1rem;
    text-align: end;
    width: 100%;
    background: none;
    color: inherit;
    border: none;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    box-shadow: lightgray 0 1px;
    border-radius: 0.1rem;
  `,
  WideButton: `
    padding: 0.4rem 1rem;
    text-align: start;
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
  BottomSectionOneTwoColumns: `
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: 2fr 5fr;
    grid-column-gap: 100px;
    grid-template-rows: 1fr;
    grid-template-areas: 
      "left right"
  `,
  BottomSectionThreeColumns: `
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: 2fr 3fr 3fr;
    grid-column-gap: 50px;
    grid-template-rows: 1fr;
    grid-template-areas: 
      "left mid right"
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
      color: '#E8E1EF',
      hover: Color('#E8E1EF').darken(0.03).hsl().string()
    },
    green: {
      color: '#d4f7d6',
      hover: Color('#d4f7d6').darken(0.03).hsl().string()
    },
    yellow: {
      color: '#f8f7c4',
      hover: Color('#f8f7c4').darken(0.03).hsl().string()
    },
    orange: {
      color: '#f4d4ab',
      hover: Color('#f4d4ab').darken(0.03).hsl().string()
    },
    blue: {
      color: '#cce7ff',
      hover: '#A0CFF7'
    },
    red: {
      color: '#EBB3A9',
      hover: Color('#EBB3A9').darken(0.03).hsl().string()
    },
    black: {
      color: '#565554',
      hover: Color('#565554').lighten(0.2).hsl().string()
    },
    offWhite: {
      color: '#f9f9f9',
      hover: Color('#f9f9f9').lighten(0.2).hsl().string()
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
