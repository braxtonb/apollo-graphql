import React from 'react';
import PropTypes from 'prop-types';

const Response = ({ message, success }) => (
  <div className="App-response">
    <i className={success ? 'success' : 'failure'} />
    {message}
  </div>
);

Response.propTypes = {
  message: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired,
};

export default Response;
