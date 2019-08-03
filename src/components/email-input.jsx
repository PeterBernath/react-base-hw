import React from 'react';
import PropTypes from 'prop-types';

const EmailInput = (props) => (
  <input
    placeholder='your@email.here'
    type='email'
    value={ props.value }
    onChange={ props.onChange }
  />
);

EmailInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EmailInput;
