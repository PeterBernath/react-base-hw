import React from 'react';
import PropTypes from 'prop-types';

export default class EnvSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      env: 'select_env',
      list: ['staging', 'production'],
    };
  }

  handleChange = ({ target: { value }}) => {
    this.setState({ env: value });
    this.props.onChange && this.props.onChange(value);
  };

  render() {

    return (
      <div className='custom-select-container'>
        <select className='custom-select' value={ this.state.env } onChange={ this.handleChange }>
          <option key='default' value='select_env' disabled>-- Select environment --</option>
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

EnvSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
};
