
import React, { Component } from 'react';
import { render } from 'react-dom';
import ResponsiveDrawer from '../components/Sidebar';
import './Register.css';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Recaptcha from 'react-recaptcha';
import axios from 'axios';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

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
      focus: false,
      fullName: null,
      email: null,
      password: null,
      errors: {
        fullName: '',
        email: '',
        password: '',
      }
    };
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
          value.length < 5
            ? 'Full Name must be 5 characters long!'
            : '';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password': 
        errors.password = 
          value.length < 8
            ? 'Password must be 8 characters long!'
            : '';
        break;
      default:
        break;
    }

    this.setState({errors, [name]: value});
  }

  onLoadRecaptcha() {
    if (this.captchaDemo) {
        this.captchaDemo.reset();
        this.captchaDemo.execute();
    }
}
verifyCallback(recaptchaToken) {
  // Here you will get the final recaptchaToken!!!  
  console.log(recaptchaToken, "<= your recaptcha token")
}

  handleSubmit = (event) => {
    event.preventDefault();
    if(validateForm(this.state.errors)) {
      const formData = new FormData();

      formData.append('name', this.state.fullName);
      formData.append('email', this.state.email);
      formData.append('password', this.state.password);
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
      // console.info('Valid Form')
    }else{
      console.error('Invalid Form')
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
              <label htmlFor="fullName">Full Name</label>
              <input type='text' name='fullName' className={errors.fullName.length > 0 ? 'inp-icon-error' : this.state.fullName == null ? '' : 'inp-icon-correct'} onChange={this.handleChange} noValidate />
              {errors.fullName.length > 0 && 
                <span className='error'>{errors.fullName}</span>}
            </div>
            <div className='email'>
              <label htmlFor="email">Email</label>
              <input type='email' name='email' onChange={this.handleChange} noValidate />
              {errors.email.length > 0 && 
                <span className='error'>{errors.email}</span>}
            </div>
            <div className='postal_code'>
              <label htmlFor="postal_code">Postal Code</label>
              <input type='text' name='postal_code' onChange={this.handleChange} noValidate />
              {errors.email.length > 0 && 
                <span className='error'>{errors.email}</span>}
            </div>
            <div className='password'>
              <label htmlFor="password">Password</label>
              <input type='password' name='password' onChange={this.handleChange} noValidate />
              {errors.password.length > 0 && 
                <span className='error'>{errors.password}</span>}
            </div>
            <div className='confirm_password'>
              <label htmlFor="confirm_password">Confirm Password</label>
              <input type='password' name='confirm_password' onChange={this.handleChange} noValidate />
              {errors.password.length > 0 && 
                <span className='error'>{errors.password}</span>}
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
            {/* <Recaptcha
                    sitekey='6LfEA50UAAAAANJqDk54fXfu1FxsS_cJsu7_bcV-'
                    render='explicit'
                    onloadCallback={this.recaptchaLoaded}
          />, */}
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
