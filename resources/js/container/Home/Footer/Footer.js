import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import styles from "./Footer_Style";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
// import ListItemIcon from "@material-ui/core/ListItemIcon";

function Footer(props) {
    const { classes } = props;
    return (
        <div className={classes.grids}>
            <div className={classes.root}>
                <Grid container spacing={40}>
                    <Grid item xs={12} className={classes.gridTitleFooter}>
                        <h2 className={classes.footerFontStyle}>Tarefazz</h2>
                    </Grid>
                    <Grid item xs={4} md={4} className={classes.gridItemStyle}>
                        <List component="nav">
                            <ListItem className={classes.gridItemStyle}>
                                <ListItemText
                                    classes={{ primary: classes.listItemText }}
                                    primary="About"
                                />
                            </ListItem>
                        </List>
                        <Divider />
                        <List component="nav">
                            <ListItem className={classes.gridItemStyle}>
                                <a
                                    href="/"
                                    color="inherit"
                                    className={classes.sublistItemText}
                                >
                                    Testimonials
                                </a>
                            </ListItem>
                            <ListItem className={classes.gridItemStyle}>
                                <a
                                    href="/"
                                    color="inherit"
                                    className={classes.sublistItemText}
                                >
                                    About Us
                                </a>
                            </ListItem>
                            <ListItem className={classes.gridItemStyle}>
                                <a
                                    href="/"
                                    color="inherit"
                                    className={classes.sublistItemText}
                                >
                                    How To Use
                                </a>
                            </ListItem>
                            <ListItem className={classes.gridItemStyle}>
                                <a
                                    href="/"
                                    color="inherit"
                                    className={classes.sublistItemText}
                                >
                                    Mission
                                </a>
                            </ListItem>
                        </List>
                    </Grid>

                    <Grid item xs={4} md={4} className={classes.gridItemStyle}>
                        <List component="nav">
                            <ListItem className={classes.gridItemStyle}>
                                <ListItemText
                                    classes={{ primary: classes.listItemText }}
                                    primary="Support"
                                />
                            </ListItem>
                        </List>
                        <Divider />
                        <List component="nav">
                            <ListItem className={classes.gridItemStyle}>
                                <a
                                    href="/"
                                    color="inherit"
                                    className={classes.sublistItemText}
                                >
                                    Terms Of Service
                                </a>
                            </ListItem>
                            <ListItem className={classes.gridItemStyle}>
                                <a
                                    href="/"
                                    color="inherit"
                                    className={classes.sublistItemText}
                                >
                                    Privacy policy
                                </a>
                            </ListItem>
                            <ListItem className={classes.gridItemStyle}>
                                <a
                                    href="/"
                                    color="inherit"
                                    className={classes.sublistItemText}
                                >
                                    Report a Problem
                                </a>
                            </ListItem>
                        </List>
                    </Grid>

                    <Grid item xs={4} md={4} className={classes.gridItemStyle}>
                        <List component="nav">
                            <ListItem className={classes.gridItemStyle}>
                                <ListItemText
                                    classes={{ primary: classes.listItemText }}
                                    primary="Contact"
                                />
                            </ListItem>
                        </List>
                        <Divider />
                        <List component="nav">
                            <ListItem className={classes.gridItemStyle}>
                                <a
                                    href="/"
                                    color="inherit"
                                    className={classes.sublistItemText}
                                >
                                    Email Us
                                </a>
                            </ListItem>
                            <ListItem className={classes.gridItemStyle}>
                                <a
                                    href="/"
                                    color="inherit"
                                    className={classes.sublistItemText}
                                >
                                    Chat
                                </a>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} className={classes.gridItemStyle}>
                        <h5 className={classes.footerFontStyle}>
                            © Copyright 2019 Tarefazz
                        </h5>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
