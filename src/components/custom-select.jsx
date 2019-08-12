import React from 'react';
import PropTypes from 'prop-types';

export default class TestAPISelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      select: 'default_select',
    };
  }

  handleChange = ({ target: { value }}) => {
    this.setState({ select: value });
    this.props.onChange && this.props.onChange(value);
  };

  render() {

    return (
      <div className='custom-select-container'>
        <label for={ this.props.selectId } className='select-label'>{ this.props.selectId }</label>
        <select className='custom-select' id={ this.props.selectId } value={ this.state.select } onChange={ this.handleChange }>
          <option key='default_select' value='default_select' disabled>{ this.props.defaultText }</option>
          { this.props.selectChoices.map((val) => {
            return (
              <option key={val} value={val}>{val}</option>
            );
          }) }
        </select>
      </div>
    );
  }
};

TestAPISelect.propTypes = {
  selectId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultText: PropTypes.string.isRequired,
  selectChoices: PropTypes.arrayOf(PropTypes.string).isRequired
};
