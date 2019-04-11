
import React, { Component } from 'react';
import { render } from 'react-dom';
import ResponsiveDrawer from '../components/Sidebar';
import './Register.css';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Recaptcha from 'react-recaptcha';
import axios from 'axios';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validPostalCodeRegexCA = RegExp(/([ABCEGHJKLMNPRSTVXY]\d)([ABCEGHJKLMNPRSTVWXYZ]\d){2}/i);
const validPostalCodeRegexBR = RegExp(/^\d{5}-?\d{3}$/);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVerified: false,
      focus: false,
      fullName: null,
      email: null,
      postal_code: null,
      password: null,
      confirm_password: null,
      errors: {
        fullName: '',
        email: '',
        password: '',
        postal_code: '',
        confirm_password: '',
      }
    };
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
  }

  recaptchaLoaded(){
    console.log('captcha successfully loaded');
  }
  
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'fullName': 
        errors.fullName = 
          value.length < 8
            ? 'Full Name must be 8 characters long!'
            : '';
      break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
      break;
      case 'postal_code': 
        errors.postal_code =   
        validPostalCodeRegexCA.test(value) || validPostalCodeRegexBR.test(value)
            ? ''
            : 'You must enter a Canadian or Brazilian Postal Code!';
      break;
      case 'password': 
        errors.password = 
          value.length < 8
            ? 'Password must be 8 characters long!'
            : '';
      break;
      case 'confirm_password': 
        errors.confirm_password = 
        value == this.state.password
            ? ''
            : "The passwords doesn't match";
      break;
      default:
        break;
    }

    this.setState({errors, [name]: value});
  }

  onLoadRecaptcha() {
    console.log('in verify ONLOADRECAPTCHA');
      if (this.captchaDemo) {
          this.captchaDemo.reset();
          this.captchaDemo.execute();
      }
  }
  verifyCallback(response) {
    console.log('in verify callback');
    console.log(response);
    new Promise((resolve) => this.setState(isVerified, () => resolve()));

    // return new Promise(function(resolve, reject) { 
    //   if(response){
    //     this.setState({isVerified: true});
    //     resolve();
    //   }
    //   else {
    //     reject();
    //   }
    // });
    
    // Here you will get the final recaptchaToken!!!  
    // console.log(recaptchaToken, "<= your recaptcha token")
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.isVerified){
      console.log('Its verified');
      if(validateForm(this.state.errors)) {
        const formData = new FormData();
  
        formData.append('name', this.state.fullName);
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
        formData.append('postal_code', this.state.postal_code);

        axios({
          method: 'post',
          url: 'api/register_store',
          data: formData,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            'Acccept': 'application/json',
            'Content-Type': 'application/json',
          },
      })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }else{
        console.error('Invalid Form')
      }
    }
   else {
     alert('Please fill the recaptcha');
   }
  }


  render() {
    const {errors} = this.state;    
    return (
      <div className='wrapper'>
            <ResponsiveDrawer origin="home"/>

        <div className='form-wrapper'>
          <h2>Create Account</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className='fullName'>
              <label htmlFor="fullName">Full Name<abbr title="Required">*</abbr></label>
              <input type='text' name='fullName' className={errors.fullName.length > 0 ? 'inp-icon-error' : this.state.fullName == null ? '' : 'inp-icon-correct'} onChange={this.handleChange} noValidate />
              {errors.fullName.length > 0 && 
                <span className='error'>{errors.fullName}</span>}
            </div>
            <div className='email'>
              <label htmlFor="email">Email<abbr title="Required">*</abbr></label>
              <input type='email' name='email' className={errors.email.length > 0 ? 'inp-icon-error' : this.state.email == null ? '' : 'inp-icon-correct'} onChange={this.handleChange} noValidate />
              {errors.email.length > 0 && 
                <span className='error'>{errors.email}</span>}
            </div>
            <div className='postal_code'>
              <label htmlFor="postal_code">Postal Code<abbr title="Required">*</abbr></label>
              <input type='text' name='postal_code' className={errors.postal_code.length > 0 ? 'inp-icon-error' : this.state.postal_code == null ? '' : 'inp-icon-correct'} onChange={this.handleChange} noValidate />
              {errors.postal_code.length > 0 && 
                <span className='error'>{errors.postal_code}</span>}
            </div>
            <div className='password'>
              <label htmlFor="password">Password<abbr title="Required">*</abbr></label>
              <input type='password' name='password' className={errors.password.length > 0 ? 'inp-icon-error' : this.state.password == null ? '' : 'inp-icon-correct'} onChange={this.handleChange} noValidate />
              {errors.password.length > 0 && 
                <span className='error'>{errors.password}</span>}
            </div>
            <div className='confirm_password'>
              <label htmlFor="confirm_password">Confirm Password<abbr title="Required">*</abbr></label>
              <input type='password' name='confirm_password' className={errors.confirm_password.length > 0 ? 'inp-icon-error' : this.state.confirm_password == null ? '' : 'inp-icon-correct'} onChange={this.handleChange} noValidate />
              {errors.confirm_password.length > 0 && 
                <span className='error'>{errors.confirm_password}</span>}
            </div>
            <div className='info'>
              <small>Password must be eight characters in length.</small>
            </div>
            <div className='recaptcha'>
            <Recaptcha
            ref={(el) => {this.captchaDemo = el;}}
            size="normal"
            render="explicit"
            sitekey="6LcmI50UAAAAANmitKM4gr1Qf0HtCHyh4dGKMvkn"
            onloadCallback={this.onLoadRecaptcha}
            verifyCallback={this.verifyCallback}
        />
            </div>
            <div className='submit'>
              <button>Create</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
