import React from 'react';
import PropTypes from 'prop-types';

export default class EnvSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      env: 'staging',
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
