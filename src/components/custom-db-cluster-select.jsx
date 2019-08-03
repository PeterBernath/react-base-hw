import React from 'react';
import PropTypes from 'prop-types';

export default class CustomDbClusterSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cluster: 'demo-sa',
      list: ['demo-sa', 'demo-nw', 'demo-fp', 'demo-am', 'demo-vr'],
    };
  }

  handleChange = ({ target: { value }}) => {
    this.setState({ cluster: value });
    this.props.onChange && this.props.onChange(value);
  };

  render() {

    return (
      <select className='custom-select' value={ this.state.cluster } onChange={ this.handleChange }>
        { this.state.list.map((val) => {
          return (
            <option key={val} value={val}>{val}</option>
          );
        }) }
      </select>
    );
  }
};

CustomDbClusterSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
};
