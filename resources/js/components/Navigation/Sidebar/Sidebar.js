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
import ExitToApp from "@material-ui/icons/ExitToApp";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import WorkIcon from "@material-ui/icons/Work";
import NoteIcon from "@material-ui/icons/NoteAdd";
import LoginIcon from "@material-ui/icons/LockOpenOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import styles from "./Sidebar_Style";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PersonOutline from "@material-ui/icons/Person";
import AccountCircle from "@material-ui/icons/AccountCircle";

class Sidebar extends Component {
    state = {
        mobileOpen: false,
        nav_tabs_logged: [
            { id: 0, name: "Home", show: false, href: "/" },
            { id: 1, name: "Find an Ally", show: false },
            { id: 2, name: "Job Bank", show: false },
            { id: 3, name: "Register", show: false, href: "/register" },
            { id: 4, name: "Login", show: false, href: "/login" }
        ],
        nav_tabs_not_logged: [
            { id: 0, name: "Home", show: false, href: "/" },
            { id: 1, name: "Find an Ally", show: false },
            { id: 2, name: "Job Bank", show: false },
            { id: 3, name: "Profile", show: false, href: "/postjob_profile" },
            { id: 4, name: "Logout", show: false, href: "/logout" }
        ]
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    handleClickNav = href => {
        window.location = href;
    };

    render() {
        const { classes, theme, isLoggedIn } = this.props;
        let isHomePage = { root: classes.appBar };
        if (this.props.currentRoute === "/") {
            isHomePage = { root: classes.appBar_home };
        }
        const drawer = (
            <div>
                <div>
                    <IconButton onClick={this.handleDrawerToggle}>
                        <ChevronLeftIcon />
                    </IconButton>
                    <Divider />
                </div>
                <List>
                    {this.props.isLoggedIn
                        ? this.state.nav_tabs_not_logged.map((tabs, index) => (
                              <ListItem
                                  button
                                  key={tabs.id}
                                  onClick={event =>
                                      this.handleClickNav(tabs.href)
                                  }
                              >
                                  {(() => {
                                      switch (index) {
                                          case 0:
                                              return (
                                                  <ListItemIcon>
                                                      <HomeIcon />
                                                  </ListItemIcon>
                                              );
                                          case 1:
                                              return (
                                                  <ListItemIcon>
                                                      <SearchIcon />
                                                  </ListItemIcon>
                                              );
                                          case 2:
                                              return (
                                                  <ListItemIcon>
                                                      <WorkIcon />
                                                  </ListItemIcon>
                                              );
                                          case 3:
                                              return (
                                                  <ListItemIcon>
                                                      <PersonOutline />
                                                  </ListItemIcon>
                                              );
                                          case 4:
                                              return (
                                                  <ListItemIcon>
                                                      <ExitToApp />
                                                  </ListItemIcon>
                                              );
                                          default:
                                              return null;
                                      }
                                  })()}
                                  <ListItemText primary={tabs.name} />
                              </ListItem>
                          ))
                        : this.state.nav_tabs_logged.map((tabs, index) => (
                              <ListItem
                                  button
                                  key={tabs.id}
                                  onClick={event =>
                                      this.handleClickNav(tabs.href)
                                  }
                              >
                                  {(() => {
                                      switch (index) {
                                          case 0:
                                              return (
                                                  <ListItemIcon>
                                                      <HomeIcon />
                                                  </ListItemIcon>
                                              );
                                          case 1:
                                              return (
                                                  <ListItemIcon>
                                                      <SearchIcon />
                                                  </ListItemIcon>
                                              );
                                          case 2:
                                              return (
                                                  <ListItemIcon>
                                                      <WorkIcon />
                                                  </ListItemIcon>
                                              );
                                          case 3:
                                              return (
                                                  <ListItemIcon>
                                                      <NoteIcon />
                                                  </ListItemIcon>
                                              );
                                          case 4:
                                              return (
                                                  <ListItemIcon>
                                                      <LoginIcon />
                                                  </ListItemIcon>
                                              );
                                          default:
                                              return null;
                                      }
                                  })()}
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
                            {this.props.isLoggedIn && this.props.currentRoute === "/" ? (
                                <AccountCircle
                                    onClick={() =>
                                        this.handleClickNav("/postjob_profile")
                                    }
                                />
                            ) : null}
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
                            {/* <Drawer
                                classes={{
                                    paper: classes.drawerPaper
                                }}
                                variant="persistent"
                                open={this.state.mobileOpen}
                                onClose={this.handleDrawerToggle}
                            >
                                {drawer}
                            </Drawer> */}
                        </Drawer>
                    </Hidden>
                    {/* <Hidden smUp implementation="css"> */}
                    {/* {this.props.isLoggedIn ? ( */}
                    {/* <Drawer
                                classes={{
                                    paper: classes.drawerPaper
                                }}
                                variant="persistent"
                                open={this.state.mobileOpen}
                                onClose={this.handleDrawerToggle}
                            >
                                {drawer}
                            </Drawer> */}
                    {/* ) : null} */}
                    {/* </Hidden> */}
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
