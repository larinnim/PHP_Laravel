
import React, { Component } from 'react';
import ResponsiveDrawer from '../../components/Sidebar';
import './Register.css';
import Recaptcha from 'react-recaptcha';
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import i18n from '../../i18n/index';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CustomizedSnackbars from '../../components/Snackbar';
import Grid from '@material-ui/core/Grid';

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
      mate: false,
      postJob: false,
      isVerified: true,
      fullName: '',
      email: '',
      postal_code: '',
      password: '',
      confirm_password: '',
      submitSet: false,
      emptyErrorSnackbar: false,
      duplicateEmailErrorSnackbar: false,
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
        checkbox: '',
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
      if (this.captchaDemo) {
          this.captchaDemo.reset();
          this.captchaDemo.execute();
      }
  }

  handleEmptyForm () {
    let errors_required = this.state.errors_required;

    if(!this.state.fullName || !this.state.postal_code || !this.state.email || !this.state.password || !this.state.confirm_password || (!this.state.mate && !this.state.postJob)){
      if (!this.state.fullName) {
        errors_required.fullName = 'This is required';
      }
      else if (!this.state.postal_code) {
        errors_required.postal_code = 'This is required';
      }
      else if (!this.state.email) {
        errors_required.email = 'This is required';
      }
      else if (!this.state.password) {
        errors_required.password = 'This is required';
      }
      else if (!this.state.confirm_password) {
        errors_required.confirm_password = 'This is required';
      }
      else if (!this.state.mate || !this.state.postJob) {
        errors_required.checkbox = 'This is required';
      }
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


  handleSubmit =  (event) => {
    var self = this;
    self.setState({duplicateEmailErrorSnackbar: false})
    event.preventDefault();
    this.setState({
      submitSet: true
    })
    // if(this.state.isVerified){
      if(validateForm(this.state.errors) && this.handleEmptyForm()) {
        const formData = new FormData();
  
       const mate_value =  this.state.mate === true ? 1 : 0
       const postJob_value =  this.state.postJob === true ? 1 : 0
        console.log('mate value' + mate_value);
        console.log('mate state value' + this.state.mate);
        console.log('post job value' + postJob_value);
        console.log('POst Job value' + this.state.postJob);

        formData.append('name', this.state.fullName);
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
        formData.append('postal_code', this.state.postal_code);
        formData.append('mate', mate_value);
        formData.append('post_job', postJob_value);

        // formData.append('mate', this.state.mate);
        // formData.append('post_job', this.state.postJob);

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
            if(response.data.exists){
              self.setState({
                isVerified: false,
                email: '',
                submitSet: false,
                emptyErrorSnackbar: false,
                duplicateEmailErrorSnackbar: true,
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
                  checkbox: '',
                }
              })
              self.captchaDemo.reset();
            }
            if(response.data.success) {
              self.props.history.replace('/');
            }
            // console.log(response);
          })
          .catch(function (error) {
            // console.log(error);
          });
      }else{
        this.setState({emptyErrorSnackbar: true})
      }
  //   }
  //  else {
  //    alert('Please fill the recaptcha');
  //  }
  }

  handleCheckbox = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const {errors, errors_required, submitSet, isVerified, emptyErrorSnackbar, duplicateEmailErrorSnackbar} = this.state;  
    const { t } = this.props;  
    return (
      <div className='wrapper'>
        <ResponsiveDrawer origin="home"/>
        <div className='form-wrapper'>
            <h2>Create Account</h2>
            <form onSubmit={this.handleSubmit} noValidate>
              <div className='fullName'>
                <label htmlFor="fullName">{t('register.fullname')}<abbr title="Required">*</abbr></label>
                <input type='text' name='fullName' className={errors.fullName.length > 0 ? 'inp-icon-error' : this.state.fullName == '' ? '' : 'inp-icon-correct'} onChange={this.handleChange} noValidate />
                {errors.fullName.length > 0 && 
                  <span className='error'>{t('register.fullname_error')}</span>}
                { errors_required.fullName.length > 0 && submitSet == true && isVerified ? 
                              <span className='error'>{t('register.required_field')}</span>
                  : null  }
              </div>
              <div className='email'>
                <label htmlFor="email">Email<abbr title="Required">*</abbr></label>
                <input type='email' name='email' value={this.state.email} className={errors.email.length > 0 ? 'inp-icon-error' : this.state.email == '' ? '' : 'inp-icon-correct'} onChange={this.handleChange} noValidate />
                {errors.email.length > 0 && 
                  <span className='error'>{t('register.email_invalido')}</span>}
                { errors_required.email.length > 0 && submitSet == true && isVerified? 
                            <span className='error'>{t('register.required_field')}</span>
              : null  }
              </div>
              <div className='postal_code'>
                <label htmlFor="postal_code">{t('register.cep')}<abbr title="Required">*</abbr></label>
                <input type='text' name='postal_code' className={errors.postal_code.length > 0 ? 'inp-icon-error' : this.state.postal_code == '' ? '' : 'inp-icon-correct'} onChange={this.handleChange} noValidate />
                {errors.postal_code.length > 0 && 
                  <span className='error'>{i18n.language == 'pt-BR' ?  t('register.postal_codeBR'): t('register.postal_codeCA')}</span>}
                {errors_required.postal_code.length > 0 && submitSet == true && isVerified? 
                  <span className='error'>{t('register.required_field')}</span>
              : null}
              </div>
              <div className='password'>
                <label htmlFor="password">{t('register.password')}<abbr title="Required">*</abbr></label> 
                <div className='info'>
                  <small>{t('register.password_set')}.</small>
                </div>
              <input type='password' name='password' className={errors.password.length > 0 ? 'inp-icon-error' : this.state.password == '' ? '' : 'inp-icon-correct'} onChange={this.handleChange} noValidate />
              {errors.password.length > 0 && 
                <span className='error'>{t('register.password_set')}</span>}
              { errors_required.password.length > 0 && submitSet == true && isVerified? 
                  <span className='error'>{t('register.required_field')}</span>
              : null  }
              </div>
              <div className='confirm_password'>
                <label htmlFor="confirm_password">{t('register.confirm_password')}<abbr title="Required">*</abbr></label>
                <input type='password' name='confirm_password' className={errors.confirm_password.length > 0 ? 'inp-icon-error' : this.state.confirm_password == '' ? '' : 'inp-icon-correct'} onChange={this.handleChange} noValidate />
                {errors.confirm_password.length > 0 && 
                  <span className='error'>{t('register.confirm_password_error')}</span>}
                { errors_required.confirm_password.length > 0 && submitSet == true && isVerified? 
                  <span className='error'>{t('register.required_field')}</span>
              : null  }
              </div>
              <div>
                <div>
                  {t('register.activity_title')}
                </div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.mate}
                        onChange={this.handleCheckbox('mate')}
                        value="mate"
                      />
                    }
                    label={t('register.activity_mate')}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.postJob}
                        onChange={this.handleCheckbox('postJob')}
                        value="postJob"
                      />
                    }
                    label={t('register.activity_postJob')}
                  />
                  <div>
                  { errors_required.checkbox.length > 0 && submitSet == true && isVerified? 
                              <div className="margin_bottom20"><span className='error'>{t('register.required_field')}</span></div>
                : null  }
                  </div>
              </div>
                <div className='recaptcha'>
                {/* <Recaptcha
                ref={(el) => {this.captchaDemo = el;}}
                size="normal"
                sitekey="6LcmI50UAAAAANmitKM4gr1Qf0HtCHyh4dGKMvkn"
                onloadCallback={this.onLoadRecaptcha}
                verifyCallback={this.onCaptchaVerify}
            /> */}
                </div>
              <div className='submit'>
                <button>{t('register.create')}</button>
              </div>
            </form>
        </div>
        {emptyErrorSnackbar == true ? <CustomizedSnackbars variant={'error'} message={'register.blank_fields'} open={true}/> : false}
        {duplicateEmailErrorSnackbar == true ?  <CustomizedSnackbars variant={'error'} message={'register.email_exist'} open={true}/> : false}
      </div>
    );
  }
}

export default withTranslation('common')(Register);
