import React from 'react';
import PropTypes from 'prop-types';

const EmailInput = (props) => (
  <input className='custom-input'
    placeholder='-- Insert your e-mail --'
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
