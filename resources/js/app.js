import React, { Component } from "react";
import Home from "./container/Home/Home";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import ResponseReset from "./container/Auth/ResponseReset";
import SignIn from "./container/Auth/SignIn";
import Logout from "./container/Auth/Logout";
import AgentsOccupation from "./container/AgentsOccupation/AgentsOccupation";
import Register from "./container/Auth/Register/Register";
import ForgotPass from "./container/Auth/ForgotPass";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/index";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import Layout from "./hoc/Layout/Layout";

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
        console.log("no app.js");
        console.log(this.props);
    }
    render() {
        let routes = (
            <Layout>
                <Switch>
                    <Route path="/login" component={withRouter(SignIn)} />
                    <Route path="/" exact component={withRouter(Home)} />
                    <Route
                        path="/agents_occupations"
                        component={withRouter(AgentsOccupation)}
                    />
                    <Route path="/register" component={withRouter(Register)} />
                    <Route path="/logout" component={withRouter(Logout)} />
                    <Route
                        path="/recoverPass"
                        component={withRouter(ForgotPass)}
                    />
                    <Route
                        path="/response-password-reset"
                        component={withRouter(ResponseReset)}
                    />
                    <Redirect to="/" />
                </Switch>
            </Layout>
        );

        // if ( this.props.isAuthenticated ) {
        //   routes = (
        //     <Switch>
        //       <Route path="/login" component={withRouter(SignIn)} />
        //       {/* <Route path="/checkout" component={Checkout} />
        //       <Route path="/orders" component={Orders} /> */}
        //       <Route path="/logout" component={withRouter(Logout)} />
        //       <Route path="/" exact component={withRouter(Home)} />
        //      {/* <Redirect to="/" component={withRouter(Home)}/> */}
        //     </Switch>
        //   );
        // }

        return (
            <div>
                <I18nextProvider i18n={i18n}>{routes}</I18nextProvider>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
