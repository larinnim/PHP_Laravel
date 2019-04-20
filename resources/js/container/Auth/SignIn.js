import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import SidebarComponent from '../../components/Sidebar';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';
import {Redirect} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom'

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
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      remember: false,
      isLoggedIn: false,
      user: [],
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleForgotPassword = (event) => {
    this.props.history.push('/recoverPass');
  }

  handleCheckboxChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleSubmit =  (event) => {
    event.preventDefault();
    this.props.onSign(this.state.email, this.state.password);
  }
  
  render() {
    const { classes } = this.props;

    let authRedirect = null;
    if (this.props.auth) {
        authRedirect = <Redirect to='/'/>
    }

    return (
      <main className={classes.main}>
        {authRedirect}
        <SidebarComponent isLoggedIn={this.props.auth} />
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleInputChange}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password"  onChange={this.handleInputChange}/>
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" checked={this.state.remember} onChange={this.handleCheckboxChange('remember')}/>}
              label="Remember me"
            />
            <Link
              // component={ForgotPassword}
              component="button"
              variant="body2"
              onClick={this.handleForgotPassword}
              // onClick={() => {
              //   alert("I'm a button.");
              // }}
            >
              Forgot password?
            </Link>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.props.onSign}
            >
              Sign in
            </Button>
            {console.log(this.props.auth)}
          </form>
        </Paper>
      </main>
    );
  }
}
SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
  console.log(state.auth.token);
  return { 
    auth: state.auth.auth,
    
    // authRedirectPath: state.auth.authRedirectPath
   };
};

const mapDispatchToProps = dispatch =>{ //receive the dispatch function as an argument
  return {
    onSign: (email, password) => dispatch(actions.auth(email, password)) //Dispatch function will be available on the onSign prop
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(SignIn));