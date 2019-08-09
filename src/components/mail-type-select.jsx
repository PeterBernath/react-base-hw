import React from 'react';
import PropTypes from 'prop-types';

export default class MailTypeSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      select: 'select_mail_type',
      list: ['jobalert', 'aggregated', 'lensa24', 'push_jobalert', 'sms_jobalert'],
    };
  }

  handleChange = ({ target: { value }}) => {
    this.setState({ select: value });
    this.props.onChange && this.props.onChange(value);
  };

  render() {

    return (
      <div className='custom-select-container'>
        <select className='custom-select' value={ this.state.select } onChange={ this.handleChange }>
          <option key='default' value='select_mail_type' disabled>-- Select mail type --</option>
          { this.state.list.map((val) => {
            return (
              <option key={val} value={val}>{val}</option>
            );
          }) }
        </select>
      </div>
    );
  }
};

MailTypeSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
};
