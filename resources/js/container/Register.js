
// import React from 'react';
// import TextField from '@material-ui/core/TextField';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import { withStyles } from '@material-ui/core/styles';

// const styles = theme => ({
//     card: {
//       marginLeft: 'auto',
//       marginRight: 'auto',
//       marginBottom: 20,
//       [theme.breakpoints.up('sm')]: {
//         width: '40%',
//         marginRight: 2,
//       },
//     },
//   });
  
// class Register extends React.Component {
//     state = {
//         name: 'Cat in the Hat',
//         age: '',
//         multiline: 'Controlled',
//         currency: 'EUR',
//       };
        
//     render() {
//         const { classes } = this.props;
//         return (
//             <div className={classes.card}>

//             <form noValidate autoComplete="off">
//                     <TextField
//                     id="outlined-name"
//                     label="Name"
//                     margin="normal"
//                     variant="outlined"
//                     />
//                     <TextField
//                     id="outlined-name"
//                     label="Email"
//                     margin="normal"
//                     variant="outlined"
//                     /> <TextField
//                     id="outlined-name"
//                     label="Postal Code"
//                     margin="normal"
//                     variant="outlined"
//                     /> <TextField
//                     id="outlined-name"
//                     label="Password"
//                     margin="normal"
//                     variant="outlined"
//                     /> <TextField
//                     id="outlined-name"
//                     label="Confirm Password"
//                     margin="normal"
//                     variant="outlined"
//                     />
//                     <FormControlLabel
//                 control={
//                 <Checkbox
//                 checked={this.state.checkedA}
//                 value="checkedA"
//                 />
//             }
//             label="Secondary"
//             />
//             </form>
//         </div>
//         );
//     }
// }


// export default withStyles( styles ) (Register);



import React, { Component } from 'react';
import { render } from 'react-dom';
import './Register.css';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

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

  handleSubmit = (event) => {
    event.preventDefault();
    if(validateForm(this.state.errors)) {
      console.info('Valid Form')
    }else{
      console.error('Invalid Form')
    }
  }


  render() {
    const {errors} = this.state;
    return (
      <div className='wrapper'>
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
