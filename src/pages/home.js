import React from 'react';
import propTypes from 'prop-types';
import MailTypeSelect from 'components/mail-type-select';
import EnvSelect from 'components/env-select';
import EmailInput from 'components/email-input';
import CustomDbClusterSelect from 'components/custom-db-cluster-select';
import fetch from 'cross-fetch';
import { connect } from 'react-redux';
import '../components/style.less';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      user: '',
      abc: 'dsadsada',
      input: 'asd',
      list: [1, 2, 3, 'asd'],
      jobalertType: 'jobalert',
      isSelectValid: true,
      success: true,
      message: {},
      env: 'staging',
      cluster: 'demo-sa',
    }
  }

  componentDidMount() {
    console.log('didmount', this.props.prop1);
  }

  onEmailInputChange = (e) => {
    this.setState({ email: e.target.value });
  };

  onSelectChangeJobalertType = (value) => {
    this.setState({
      jobalertType: value,
    });
  };

  onSelectChangeEnvironment = (value) => {
    this.setState({
      env: value,
    });
    console.log(this.state.env)
  };

  onSelectChangeCluster = (value) => {
    this.setState({
      cluster: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ isSelectValid: true });

    if (!this.state.jobalertType) {
      return this.setState({ isSelectValid: false });
    }

    fetch('/testing-api', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        jobalertType : this.state.jobalertType,
        env: this.state.env,
        cluster: this.state.cluster,
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      }
    })
      .then(res => res.json())
      .then(response => {
        this.setState({
          success: Boolean(response.success),
          message: response,
        });
        console.log(response);
      });
  };

  render() {
    return (
      <div className='main-page' >
        <div className='api-header'>Lensa Testing API</div>
        { !this.state.success &&
          <div>
            { Object.values(this.state.message) }
          </div>
        }
        <form onSubmit={ this.onSubmit }>
          <div className={ `select-container ${ this.state.isSelectValid ? '' : 'invalid' }` }>
            <MailTypeSelect
              onChange={ this.onSelectChangeJobalertType }
            />
          </div>
          <div className='email-container'>
            <EmailInput
              value={ this.state.email }
              onChange={ this.onEmailInputChange }
            />
          </div>
          <div className='env-select-container'>
            <EnvSelect
              onChange={ this.onSelectChangeEnvironment }
            />
          </div>
          <div className={ `custom-db-cluster-select-container ${ 'production' == this.state.env ? 'hidden' : '' }`}>
            <CustomDbClusterSelect
              onChange={ this.onSelectChangeCluster }
            />
          </div>
          <input className='submit-button' type='submit' value='SUBMIT'/>
        </form>
      </div>
    );
  }
}

HomePage.defaultProps = {
  prop1: [],
};

HomePage.propTypes = {
  prop1: propTypes.arrayOf(propTypes.string).isRequired,
};

const mapStateToProps = (state) => console.log('mapState', state) && ({
  todo: state.todo,
});

export default connect(mapStateToProps)(HomePage);
