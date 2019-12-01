import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from './theme';
import PropTypes from 'prop-types';

const Provider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

Provider.propTypes = {
  children: PropTypes.any.isRequired
};

export default Provider;
