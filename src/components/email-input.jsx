import React from 'react';
import PropTypes from 'prop-types';

const EmailInput = (props) => {
  let text = 'e-mail'
  const labelStyle = {}
  const divStyle = {
    border: `solid 1px ${ props.color }`,
    color: props.color,
  };
  if ('#ed9280' == props.color) {
    text = 'invalid e-mail'
    labelStyle.color = props.color;
  } else if ('#c0eb00' == props.color) {
    labelStyle.color = props.color;
  }
  return (
    <div>
      <label htmlFor='email-input' className='select-label' style={ labelStyle }>{ text }</label>
      <input id='email-input' style={divStyle} className='custom-input'
             placeholder='-- Insert your e-mail --'
             type='email'
             value={props.value}
             onChange={props.onChange}
      />
    </div>
  );
};

EmailInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

export default EmailInput;
