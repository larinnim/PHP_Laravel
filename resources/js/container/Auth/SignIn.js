import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import SidebarComponent from "../../components/Navigation/Sidebar/Sidebar";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import styles from "./SignIn_Style";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            remember: false,
            isLoggedIn: false,
            user: []
        };
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

    handleForgotPassword = event => {
        this.setState({
            email: "",
            password: ""
        });
        this.props.history.push("/recoverPass");
    };

    handleCheckboxChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.onSign(this.state.email, this.state.password);
    };
  handleRegister = (event) => {
    this.props.history.push('/register');
  }

  handleCheckboxChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

    handleSubmitSocial = event => {
        event.preventDefault();
        this.props.onSignSocial();
    };

    render() {
        const { classes } = this.props;

        let authRedirect = null;
        if (this.props.auth) {
            authRedirect = <Redirect to="/profile" />;
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
                    <div className={classes.social_div}>
                        <SocialIcon
                            className={classes.social_icon}
                            network="facebook"
                            url={"api/login/facebook"}
                            onClick={this.props.onSignSocial}
                        />
                        <SocialIcon
                            network="google"
                            url={"api/login/google"}
                            onClick={this.props.onSignSocial}
                        />
                    </div>
                    ------------------ or ------------------
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">
                                Email Address
                            </InputLabel>
                            <Input
                                id="email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={this.handleInputChange}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.handleInputChange}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="remember"
                                    color="primary"
                                    checked={this.state.remember}
                                    onChange={this.handleCheckboxChange(
                                        "remember"
                                    )}
                                />
                            }
                            label="Remember me"
                        />

                        <Link
                            type="button"
                            component="button"
                            variant="body2"
                            onClick={this.handleForgotPassword}
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
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    console.log(state.auth.token);
    return {
        auth: state.auth.auth
    };
};

const mapDispatchToProps = dispatch => {
    //receive the dispatch function as an argument
    return {
        onSign: (email, password) => dispatch(actions.auth(email, password)), //Dispatch function will be available on the onSign prop
        onSignSocial: () => dispatch(actions.authSocial()) //Dispatch function will be available on the onSign prop
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SignIn));
