
import React, { Component } from 'react';
import ResponsiveDrawer from '../../components/Sidebar';
import './Register.css';
import Recaptcha from 'react-recaptcha';
import axios from 'axios';
import { withTranslation } from 'react-i18next';

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
      submitSet: false,
      errors: {
        fullName: '',
        email: '',
        password: '',
        postal_code: '',
        confirm_password: '',
      },
      errors_required: {
        fullName: '',
        email: '',
        password: '',
        postal_code: '',
        confirm_password: '',
      }
    };
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
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

  handleEmptyForm () {
    let errors_required = this.state.errors_required;

    if (!this.state.fullName) {
      errors_required.fullName = 'This is required';
      return false;
    }
    if (!this.state.postal_code) {
      errors_required.postal_code = 'This is required';
      return false;
    }
    else if (!this.state.email) {
      errors_required.email = 'This is required';
      return false;
    }
    else if (!this.state.password) {
      errors_required.password = 'This is required';
      return false;
    }
    else if (!this.state.confirm_password) {
      errors_required.confirm_password = 'This is required';
      return false;
    }
    else {
      return true;
    }
  }

  onCaptchaVerify = (response) => {
    if(response){
      this.setState({
        isVerified: true
      })
    }
  }


  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      submitSet: true
    })
    if(this.state.isVerified){
      if(validateForm(this.state.errors) && this.handleEmptyForm()) {
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
        alert('Please, verify the required fields')
      }
    }
   else {
     alert('Please fill the recaptcha');
   }
  }


  render() {
    const {errors, errors_required, submitSet, isVerified} = this.state;  
    const { t } = this.props;
    {console.log('Calling render...')}
    
    return (
      <div className='wrapper'>
            <ResponsiveDrawer origin="home"/>

        <div className='form-wrapper'>
          <h2>Create Account</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className='fullName'>
              <label htmlFor="fullName">{t('register.fullname')}<abbr title="Required">*</abbr></label>
              <input type='text' name='fullName' className={errors.fullName.length > 0 ? 'inp-icon-error' : this.state.fullName == null ? '' : 'inp-icon-correct'} onChange={this.handleChange} noValidate />
              {errors.fullName.length > 0 && 
                <span className='error'>{errors.fullName}</span>}
                {console.log(errors_required.fullName != null && submitSet == true && isVerified)}
                {console.log('Errors: ' + errors_required.fullName)}
                {console.log('Submit: ' + submitSet)}
                {console.log('IsVerified: ' + isVerified)}

              { errors_required.fullName.length > 0 && submitSet == true && isVerified ? 
                             <span className='error'>This field is required</span>
                : null  }
            </div>
            <div className='email'>
              <label htmlFor="email">Email<abbr title="Required">*</abbr></label>
              <input type='email' name='email' className={errors.email.length > 0 ? 'inp-icon-error' : this.state.email == null ? '' : 'inp-icon-correct'} onChange={this.handleChange} noValidate />
              {errors.email.length > 0 && 
                <span className='error'>{errors.email}</span>}
                {errors_required.email.length > 0 && 
                <span className='error'>{errors_required.email}</span>}
              { errors_required.email.length > 0 && submitSet == true && isVerified? 
                          <span className='error'>This field is required</span>
            : null  }
            </div>
            <div className='postal_code'>
              <label htmlFor="postal_code">Postal Code<abbr title="Required">*</abbr></label>
              <input type='text' name='postal_code' className={errors.postal_code.length > 0 ? 'inp-icon-error' : this.state.postal_code == null ? '' : 'inp-icon-correct'} onChange={this.handleChange} noValidate />
              {errors.postal_code.length > 0 && 
                <span className='error'>{errors.postal_code}</span>}
                {errors_required.postal_code.length > 0 && 
                <span className='error'>{errors_required.postal_code}</span>}
              { errors_required.postal_code.length > 0 && submitSet == true && isVerified? 
                          <span className='error'>This field is required</span>
            : null  }
            </div>
            <div className='password'>
              <label htmlFor="password">Password<abbr title="Required">*</abbr></label> 
              <div className='info'>
              <small>Password must be eight characters in length.</small>
            </div>
              <input type='password' name='password' className={errors.password.length > 0 ? 'inp-icon-error' : this.state.password == null ? '' : 'inp-icon-correct'} onChange={this.handleChange} noValidate />
              {errors.password.length > 0 && 
                <span className='error'>{errors.password}</span>}
                {errors_required.password.length > 0 && 
                <span className='error'>{errors_required.password}</span>}
                { errors_required.password.length > 0 && submitSet == true && isVerified? 
                          <span className='error'>This field is required</span>
            : null  }
            </div>
            <div className='confirm_password'>
              <label htmlFor="confirm_password">Confirm Password<abbr title="Required">*</abbr></label>
              <input type='password' name='confirm_password' className={errors.confirm_password.length > 0 ? 'inp-icon-error' : this.state.confirm_password == null ? '' : 'inp-icon-correct'} onChange={this.handleChange} noValidate />
              {errors.confirm_password.length > 0 && 
                <span className='error'>{errors.confirm_password}</span>}
                {errors_required.confirm_password.length > 0 && 
                <span className='error'>{errors_required.confirm_password}</span>}
            </div>
            { errors_required.confirm_password != null && submitSet == true && isVerified? 
                          <span className='error'>This field is required</span>
            : null  }
            <div className='recaptcha'>
            <Recaptcha
            ref={(el) => {this.captchaDemo = el;}}
            size="normal"
            sitekey="6LcmI50UAAAAANmitKM4gr1Qf0HtCHyh4dGKMvkn"
            onloadCallback={this.onLoadRecaptcha}
            verifyCallback={this.onCaptchaVerify}
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

export default withTranslation('common')(Register);
