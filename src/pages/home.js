import React from 'react';
import propTypes from 'prop-types';
import CustomSelect from 'components/custom-select';
import EmailInput from 'components/email-input';
import fetch from 'cross-fetch';
import { connect } from 'react-redux';
import '../components/style.less';


const defaultSelectTexts = {
  mailType: '-- Select mail type --',
  env: '-- Select environment --',
  cluster: '-- Select demo cluster --',
}

const selectChoices = {
  mailType: ['jobalert', 'aggregated', 'lensa24', 'push_jobalert', 'sms_jobalert'],
  env: ['staging', 'production'],
  cluster: ['demo-sa', 'demo-nw', 'demo-fp', 'demo-am', 'demo-vr']
}

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      user: '',
      abc: 'dsadsada',
      input: 'asd',
      list: [1, 2, 3, 'asd'],
      jobalertType: null,
      isSelectValid: true,
      success: true,
      message: {},
      env: null,
      cluster: null,
      color: 'grey',
      isFormValid: false,
    }
  }

  componentDidMount() {
    console.log('didmount', this.props.prop1);
  }

  onEmailInputChange = (e) => {
    if (validateEmail(e.target.value)) {
      this.setState({ color: '#c0eb00' });
      console.log(this.state.color)
    } else {
      this.setState({ color: '#ed9280' });
      console.log(this.state.color)
    }
    console.log(validateEmail(e.target.value));
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
        if ('object' === typeof(response[this.state.email])) {
          alert(`Test e-mail of type ${this.state.jobalertType} sent successfully to e-mail address: ${response[this.state.email].email}`)
        } else {
          alert(response[this.state.email])
        }
        console.log(response[this.state.email]);
      });
  };

  render() {
    return (
      <div className='main-page' >
        <div className='api-header'>Lensa Testing API</div>
        {/*{ !this.state.success &&*/}
          {/*<div>*/}
            {/*{ Object.values(this.state.message) }*/}
          {/*</div>*/}
        {/*}*/}
        <form onSubmit={ this.onSubmit }>
          <div className={ `select-container ${ this.state.isSelectValid ? '' : 'invalid' }` }>
            <CustomSelect
              selectId ='mail type'
              onChange={ this.onSelectChangeJobalertType }
              defaultText={ defaultSelectTexts.mailType }
              selectChoices={ selectChoices.mailType }
            />
          </div>
          <div className='email-container'>
            <EmailInput
              value={ this.state.email }
              onChange={ this.onEmailInputChange }
              color={ this.state.color }
            />
          </div>
          <div className='env-select-container'>
            <CustomSelect
              selectId ='environment'
              onChange={ this.onSelectChangeEnvironment }
              defaultText={ defaultSelectTexts.env }
              selectChoices={ selectChoices.env }
            />
          </div>
          <div className={ `custom-db-cluster-select-container ${ 'production' == this.state.env ? 'hidden' : '' }`}>
            <CustomSelect
              selectId ='cluster'
              onChange={ this.onSelectChangeCluster }
              defaultText={ defaultSelectTexts.cluster }
              selectChoices={ selectChoices.cluster }
            />
          </div>
          {('#c0eb00' === this.state.color && 'production' === this.state.env && this.state.jobalertType) ||
          ('#c0eb00' === this.state.color && 'staging' === this.state.env && this.state.jobalertType && this.state.cluster)? (
            <input className='submit-button' type='submit' value='SUBMIT'/>
          ) : (
            <input className='submit-button' type='submit' value='SUBMIT' disabled/>
          )}
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
