import React from 'react';
import PropTypes from 'prop-types';
import './style.less';


export default class CustomDbClusterSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cluster: 'select_cluster',
      list: ['demo-sa', 'demo-nw', 'demo-fp', 'demo-am', 'demo-vr'],
    };
  }

  handleChange = ({ target: { value }}) => {
    this.setState({ cluster: value });
    this.props.onChange && this.props.onChange(value);
  };

  render() {

    return (
      <div className='custom-select-container'>
        <select className='custom-select' value={ this.state.cluster } onChange={ this.handleChange }>
          <option key='default' value='select_cluster' disabled>-- Select demo cluster --</option>
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

CustomDbClusterSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
};
