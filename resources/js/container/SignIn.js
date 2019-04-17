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
import SidebarComponent from '../components/Sidebar';

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

  handleCheckboxChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleSubmit =  (event) => {
    var self = this;
    event.preventDefault();
    const formData = new FormData();
    console.log(this.state.email)
    console.log(this.state.password)

    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    formData.append("remember", this.state.remember);

    axios
    .post("/api/logged_in", formData)
    .then(response => {
      console.log(response);
      return response;
    })
    .then(json => {
      if (json.data.success) {
        alert("Login Successful!");

        let userData = {
          name: json.data.user.name,
          id: json.data.user.id,
          email: json.data.user.email,
          token: json.data.user.auth_token,
          timestamp: new Date().toString()
        };

        let appState = {
          isLoggedIn: true,
          user: userData
        };
        // save app state with user date in local storage
        localStorage["appState"] = JSON.stringify(appState);
        this.setState({
          isLoggedIn: appState.isLoggedIn,
          user: appState.user
        });
      } else alert("Login Failed!");
    })
    .catch(error => {
      alert(`An Error Occured! ${error}`);
      $("#login-form button")
        .removeAttr("disabled")
        .html("Login");
    });
    
  }
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <SidebarComponent origin="home" isLoggedIn={this.state.isLoggedIn} />

        {/* <ResponsiveDrawer origin="home" isLoggedIn={this.state.isLoggedIn} /> */}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}
SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);