import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title }) => (
  <header className="App-header">
    <h1 className="App-title">{title}</h1>
  </header>
);

Header.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(),
  ]),
};

Header.defaultProps = {
  title: 'title',
};

export default Header;
