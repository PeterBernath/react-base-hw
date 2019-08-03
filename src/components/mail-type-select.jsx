import React from 'react';
import PropTypes from 'prop-types';

export default class MailTypeSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      select: 'jobalert',
      list: ['jobalert', 'aggregated', 'lensa24', 'push_jobalert', 'sms_jobalert'],
    };
  }

  handleChange = ({ target: { value }}) => {
    this.setState({ select: value });
    this.props.onChange && this.props.onChange(value);
  };

  render() {

    return (
      <select className='custom-select' value={ this.state.select } onChange={ this.handleChange }>
        { this.state.list.map((val) => {
          return (
            <option key={val} value={val}>{val}</option>
          );
        }) }
      </select>
    );
  }
};

MailTypeSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
};
