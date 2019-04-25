import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import Button from "@material-ui/core/Button";
import styles from "./Sidebar_Style";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


class Sidebar extends Component {
    state = {
        mobileOpen: false,
        nav_tabs: [
            { id: 0, name: "Find an Ally", show: false },
            { id: 1, name: "Job Bank", show: false },
            { id: 2, name: "Register", show: false, href: "/register" },
            { id: 3, name: "Login", show: false, href: "/login" }
            // {id: 4, name: 'Logout', show: false, href: '/logout'}
        ],
        scroll: false
    };

    handleDrawerClose = () => {
        this.setState({ mobileOpen: false });
      };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    handleClickTab = id => {
        const tab_found = { ...this.state.nav_tabs[id] };
    };

    handleClickNav = href => {
        window.location = href;
    };

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = event => {
        let scrollTop = window.scrollY;
        console.log(scrollTop);
        if (scrollTop > 428) {
            this.setState({ scroll: true });
        } else {
            this.setState({ scroll: false });
        }
    };

    render() {
        console.log("Scroll");
        console.log(this.state.scroll);
        const { classes, theme, isLoggedIn } = this.props;
        console.log("Sidebar Props");
        console.log(this.props);
        let isHomePage = null;
        if (this.props.currentRoute != "/" || this.state.scroll) {
            isHomePage = { root: classes.appBar };
        } else {
            isHomePage = { root: classes.appBar_home };
        }

        const drawer = (
            <div>
                <div>
                    <IconButton onClick={this.handleDrawerClose}>
                        <ChevronLeftIcon /> 
                    </IconButton>
                    <Divider />
                </div>
                <List>
                    { this.state.nav_tabs.map((tabs, index) => (
                            <ListItem
                                button
                                key={tabs.id}
                                onClick={event =>
                                    this.handleClickNav(tabs.href)
                                }
                            >
                                <ListItemIcon>
                                    {index === 0 ? (
                                        <CalendarToday />
                                    ) : index === 1 ? (
                                        <SettingsIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={tabs.name} />
                            </ListItem>
                        ))}
                </List>
            </div>
        );

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" classes={isHomePage}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <a
                            href="/"
                            color="inherit"
                            className={`${classes.flexGrow10} ${
                                classes.main_Tarefazz
                            }`}
                        >
                            Tarefazz
                        </a>
                        <Hidden xsDown>
                            <Button
                                onClick={() => this.handleClickNav("/")}
                                color="inherit"
                            >
                                Find an Ally
                            </Button>
                            <Button
                                onClick={() => this.handleClickNav("/")}
                                color="inherit"
                            >
                                Job Bank
                            </Button>
                            {this.props.isLoggedIn ? null : (
                                <Button
                                    onClick={() =>
                                        this.handleClickNav("/register")
                                    }
                                    color="inherit"
                                >
                                    Register
                                </Button>
                            )}
                            {this.props.isLoggedIn ? (
                                <Button
                                    onClick={() =>
                                        this.handleClickNav("/logout")
                                    }
                                    color="inherit"
                                >
                                    Logout
                                </Button>
                            ) : (
                                <Button
                                    onClick={() =>
                                        this.handleClickNav("/login")
                                    }
                                    color="inherit"
                                >
                                    Login
                                </Button>
                            )}
                            <Navbar />
                        </Hidden>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer}>
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            anchor={
                                theme.direction === "rtl" ? "right" : "left"
                            }
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden smUp implementation="css">
                        {this.props.isLoggedIn ? (
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper
                                }}
                                variant="permanent"
                                open
                            >
                                {drawer}
                            </Drawer>
                        ) : null}
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                </main>
            </div>
        );
    }
}

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
    container: PropTypes.object,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Sidebar);
