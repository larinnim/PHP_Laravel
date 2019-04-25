
import React from 'react';
import './Register/Register.css';
import SidebarComponent from '../../components/Navigation/Sidebar';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import queryString from 'query-string';
import SnackbarComponent from '../../components/Snackbar';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
  });
  


class ResponseReset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          confirmPassword: '',
          token: '',
          showSuccess: false,
          errors: {
            email: '',
            password: '',
            confirmPassword: '',
          },
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const errors = this.state.errors;
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        switch (name) {
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
            case 'confirm_password': 
                errors.confirmPassword = 
                value == this.state.password
                    ? ''
                    : "The passwords doesn't match";
            break;
        }

        this.setState({
            [name]: value
          });
      }

    handleSubmit =  (event) => {
        event.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            alert("Passwords don't match");
        } else {
            this.props.onForgotPassword(this.state.email, this.state.password, this.state.token);
        }
    }

    static getDerivedStateFromProps(props, state) {
        const params = new URLSearchParams(props.location.search); 
        const token = params.get('token');
        console.log('inside getDerivate' + token);
        if(props.variant == 'success'){
            return {
                token: token,
                showSuccess: true
            };
        }
        return {
            token: token,
        };
        
    }

    render(){
        const { classes } = this.props;
        const {errors} = this.state;  
        console.log('errors: '+errors.email)
        // const params = new URLSearchParams(this.props.location.search); 
        // const token = params.get('token');
        // this.setState({token: token});

        return (
            <div className={classes.main}>
                <SidebarComponent isLoggedIn={this.props.auth}/>
                {!this.state.showSuccess ? 
                <div>
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleInputChange}/>
                            {errors.email ?
                            <span className='error'>Please type a valid email</span>: null}
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password"  onChange={this.handleInputChange}/>
                            {errors.password ?
                            <span className='error'>Password deve ter no minimo 8 caracteres</span> : null}
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Confirm Password</InputLabel>
                            <Input name="confirmPassword" type="password" id="confirmPassword" autoComplete="current-password"  onChange={this.handleInputChange}/>
                            {errors.confirm_password ?
                                <span className='error'>Passo diferentes</span> : null}
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.props.onSign}
                            >
                            Reset Password
                        </Button>
                    </form>
                </div>
                :
                <div>
                    <div className="check">
                        <div className="checkmark"></div>
                    </div>
                    <div className="reset_phrase">
                        <h2>Your password was successfully reset!</h2>
                        <h5>If you did not make this change, contact our support team.</h5>
                    </div>
                </div>
                }
                {this.props.message ? <SnackbarComponent variant={this.props.variant ? this.props.variant : 'error'} message={this.props.message} open={true}/> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
      message: state.forgotPassword.message,
      variant: state.forgotPassword.variant,
    };
  };

const mapDispatchToProps = dispatch =>{ //receive the dispatch function as an argument
    return {
        onForgotPassword: (email, password, token) => dispatch(actions.forgotPassword(email, password, token)) //Dispatch function will be available on the onSign prop
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(ResponseReset));

// export default connect(mapStateToProps, mapDispatchToProps) (ResponseReset);