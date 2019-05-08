import React, { Component } from "react";
import Aux from "../Aux/Aux";
import "./Layout.css";
import Sidebar from "../../components/Navigation/Sidebar/Sidebar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


class Layout extends Component {
    state = {
        showSideDrawer: false
    };
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };
    sideDrawerToggleHandler = () => {
        this.setState(prevState => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    };
    render() {
    
        return (
            <Aux>
                <Sidebar isLoggedIn={this.props.auth} currentRoute={this.props.history.location.pathname}/>
                <main>{this.props.children}</main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth.auth
    };
};

export default connect(
    mapStateToProps,
    null
)(withRouter(Layout));
