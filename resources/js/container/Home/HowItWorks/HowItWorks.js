import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import styles from "./HowItWorks_Style";
import photoNeedJob from "../../../../img/HowWorks/Need_Job.png";
import photoRegisterAlly from "../../../../img/HowWorks/Register_Ally.png";
import photoSearchJobBanck from "../../../../img/HowWorks/Search_JobBank.png";
import photoReceiveAlert from "../../../../img/HowWorks/Receive_Alert.png";
import contactWhoWantsHelp from "../../../../img/HowWorks/Contact_WhoWantsHelp.png";
import photoAcceptDecline from "../../../../img/HowWorks/Accept_Decline.png";
import photoNeedHelp from "../../../../img/HowWorks/Need_Help.png";
import photoAllyContact from "../../../../img/HowWorks/Ally_Contact.png";
import photoFindAlly from "../../../../img/HowWorks/Find_Ally.png";
import photoPostJob from "../../../../img/HowWorks/Post_Job.png";
import photoRegisterPostJob from "../../../../img/HowWorks/Register_Post_Job.png";
import photoClientContact from "../../../../img/HowWorks/Client_Contact.png";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import photoCardAlly from "../../../../img/Cards/ally.png";
import photoCardJobBank from "../../../../img/Cards/job_bank.png";
import photoCardPostJob from "../../../../img/Cards/cards_post_job.png";
import photoCardFindAlly from "../../../../img/Cards/cards_find_ally.png";
import "./HowItWorks.css";

function HowItWorks(props) {
    const { classes } = props;
    return (
        <div className={classes.grids}>
            <div className={classes.root}>
                <Grid container spacing={40}>
                    <Grid item xs={12} md={3}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={photoCardAlly}
                                    title="Become an Ally"
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                        classes={{ root: classes.alignItems }}
                                    >
                                        Become an Ally
                                    </Typography>
                                    <Typography component="p">
                                        Looking for a job or second income?
                                        BECOME AN ALLY to put yourself available
                                        to perform jobs that you have experience
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions
                                classes={{ root: classes.alignButton }}
                            >
                                <Button
                                    variant="contained"
                                    size="small"
                                    classes={{ root: classes.button }}
                                >
                                    Sign Up For Free
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={photoCardJobBank}
                                    title="Job Bank"
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                        classes={{ root: classes.alignItems }}
                                    >
                                        Job Bank
                                    </Typography>
                                    <Typography component="p">
                                        Already an ALLY and think you can do any
                                        of the posted jobs? Use JOB BANK to
                                        browse thousands of contracting jobs
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions
                                classes={{ root: classes.alignButton }}
                            >
                                <Button
                                    variant="contained"
                                    size="small"
                                    classes={{ root: classes.button }}
                                >
                                    Sign Up For Free
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={photoCardPostJob}
                                    title="Post Job"
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                        classes={{ root: classes.alignItems }}
                                    >
                                        Post Job
                                    </Typography>
                                    <Typography component="p">
                                        Can't miss that wedding party? POST JOB
                                        to find a last minute ALLY to baby sit
                                        your kids and pets while you enjoy a
                                        night out
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions
                                classes={{ root: classes.alignButton }}
                            >
                                <Button
                                    variant="contained"
                                    size="small"
                                    classes={{ root: classes.button }}
                                >
                                    Sign Up For Free
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={photoCardFindAlly}
                                    title="Find an Ally"
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                        classes={{ root: classes.alignItems }}
                                    >
                                        Find an Ally
                                    </Typography>
                                    <Typography component="p">
                                        Need help with that plumbing? FIND an
                                        ALLY can help you finding an experienced
                                        ALLY to help with your needs
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions
                                classes={{ root: classes.alignButton }}
                            >
                                <Button
                                    variant="contained"
                                    size="small"
                                    classes={{ root: classes.button }}
                                >
                                    Sign Up For Free
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container spacing={40}>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={40}>
                                <Grid item xs={3} className={classes.photos}>
                                    <img
                                        src={photoNeedJob}
                                        className="animation-timeline-photo-1"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={9}
                                    className={`${classes.principalTitles} ${
                                        classes.titles
                                    }`}
                                >
                                    <h5
                                        className={
                                            classes.principalTitlesTextBox
                                        }
                                    >
                                        Need a job?
                                    </h5>
                                </Grid>
                            </Grid>
                            <Grid container spacing={40}>
                                <Grid item xs={3}>
                                    <ul className="height-timeline noMarginUl">
                                        <span className="timeline-travel1 " />
                                    </ul>
                                </Grid>
                            </Grid>
                            <Grid container spacing={40}>
                                <Grid item xs={3} className={classes.photos}>
                                    <img
                                        src={photoRegisterAlly}
                                        className="animation-timeline-photo-2"
                                    />
                                </Grid>
                                <Grid item xs={9} className={classes.titles}>
                                    <h5 className="display-hide-card2-text-animation-timeline">
                                        Register as an Ally
                                    </h5>
                                </Grid>
                            </Grid>
                            <Grid container spacing={40}>
                                <Grid item xs={3}>
                                    <ul className="noMarginUl height-timeline">
                                        <span className="timeline-travel2" />
                                    </ul>
                                </Grid>
                                <Grid item xs={4}>
                                    <ul className="noMarginUl height-timeline timeline-horizontal-width">
                                        <span className="timeline-travel_horizontal-right" />
                                    </ul>
                                </Grid>
                                <Grid item xs={3}>
                                    <ul className="noMarginUl height-timeline">
                                        <span className="timeline-travel3" />
                                    </ul>
                                </Grid>
                            </Grid>
                            <Grid container spacing={40}>
                                <Grid item xs={3} className={classes.photos}>
                                    <img
                                        src={photoSearchJobBanck}
                                        className="animation-timeline-photo-3"
                                    />
                                </Grid>
                                <Grid item xs={4} className={classes.titles}>
                                    <h5 className="display-hide-card3-text-animation-timeline">
                                        Search the job bank
                                    </h5>
                                </Grid>
                                <Grid item xs={2} className={classes.photos}>
                                    <img
                                        src={photoReceiveAlert}
                                        className="animation-timeline-photo-3"
                                    />
                                </Grid>
                                <Grid item xs={3} className={classes.titles}>
                                    <h5 className="display-hide-card3-text-animation-timeline">
                                        Job alert
                                    </h5>
                                </Grid>
                            </Grid>
                            <Grid container spacing={40}>
                                <Grid item xs={6}>
                                    <ul className="noMarginUl height-timeline">
                                        <span className="timeline-travel4" />
                                    </ul>
                                </Grid>
                                <Grid item xs={6}>
                                    <ul className="noMarginUl height-timeline">
                                        <span className="timeline-travel5" />
                                    </ul>
                                </Grid>
                            </Grid>

                            <Grid container spacing={40}>
                                <Grid item xs={3} className={classes.photos}>
                                    <img
                                        src={contactWhoWantsHelp}
                                        className="animation-timeline-photo-5"
                                    />
                                </Grid>
                                <Grid item xs={4} className={classes.titles}>
                                    <h5 className="display-hide-card5-text-animation-timeline">
                                        Contact who wants your help
                                    </h5>
                                </Grid>
                                <Grid item xs={2} className={classes.photos}>
                                    <img
                                        src={photoAcceptDecline}
                                        className="animation-timeline-photo-6"
                                    />
                                </Grid>
                                <Grid item xs={3} className={classes.titles}>
                                    <h5 className="display-hide-card5-text-animation-timeline">
                                        Accept or decline
                                    </h5>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={40}>
                                <Grid item xs={3} className={classes.photos}>
                                    <img
                                        src={photoNeedHelp}
                                        className="animation-timeline-photo-1"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={9}
                                    className={`${classes.principalTitles} ${
                                        classes.titles
                                    }`}
                                >
                                    <h5
                                        className={
                                            classes.principalTitlesTextBox
                                        }
                                    >
                                        Need help?
                                    </h5>
                                </Grid>
                            </Grid>
                            <Grid container spacing={40}>
                                <Grid item xs={3}>
                                    <ul className="height-timeline noMarginUl">
                                        <span className="timeline-travel1 " />
                                    </ul>
                                </Grid>
                            </Grid>
                            <Grid container spacing={40}>
                                <Grid item xs={3} className={classes.photos}>
                                    <img
                                        src={photoRegisterPostJob}
                                        className="animation-timeline-photo-2"
                                    />
                                </Grid>
                                <Grid item xs={9} className={classes.titles}>
                                    <h5 className="display-hide-card2-text-animation-timeline">
                                        Register as Post Job
                                    </h5>
                                </Grid>
                            </Grid>
                            <Grid container spacing={40}>
                                <Grid item xs={3}>
                                    <ul className="noMarginUl height-timeline">
                                        <span className="timeline-travel2" />
                                    </ul>
                                </Grid>
                                <Grid item xs={4}>
                                    <ul className="noMarginUl height-timeline timeline-horizontal-width">
                                        <span className="timeline-travel_horizontal-right" />
                                    </ul>
                                </Grid>
                                <Grid item xs={3}>
                                    <ul className="noMarginUl height-timeline">
                                        <span className="timeline-travel3" />
                                    </ul>
                                </Grid>
                            </Grid>
                            <Grid container spacing={40}>
                                <Grid item xs={3} className={classes.photos}>
                                    <img
                                        src={photoPostJob}
                                        className="animation-timeline-photo-3"
                                    />
                                </Grid>
                                <Grid item xs={4} className={classes.titles}>
                                    <h5 className="display-hide-card3-text-animation-timeline">
                                        Post a job describing your needs
                                    </h5>
                                </Grid>
                                <Grid item xs={2} className={classes.photos}>
                                    <img
                                        src={photoFindAlly}
                                        className="animation-timeline-photo-3"
                                    />
                                </Grid>
                                <Grid item xs={3} className={classes.titles}>
                                    <h5 className="display-hide-card3-text-animation-timeline">
                                        Find an Ally
                                    </h5>
                                </Grid>
                            </Grid>
                            <Grid container spacing={40}>
                                <Grid item xs={6}>
                                    <ul className="noMarginUl height-timeline">
                                        <span className="timeline-travel4" />
                                    </ul>
                                </Grid>
                                <Grid item xs={6}>
                                    <ul className="noMarginUl height-timeline">
                                        <span className="timeline-travel5" />
                                    </ul>
                                </Grid>
                            </Grid>

                            <Grid container spacing={40}>
                                <Grid item xs={3} className={classes.photos}>
                                    <img
                                        src={photoAllyContact}
                                        className="animation-timeline-photo-5"
                                    />
                                </Grid>
                                <Grid item xs={4} className={classes.titles}>
                                    <h5 className="display-hide-card5-text-animation-timeline">
                                        Ally will contact you
                                    </h5>
                                </Grid>
                                <Grid item xs={2} className={classes.photos}>
                                    <img
                                        src={photoClientContact}
                                        className="animation-timeline-photo-6"
                                    />
                                </Grid>
                                <Grid item xs={3} className={classes.titles}>
                                    <h5 className="display-hide-card5-text-animation-timeline">
                                        Contact Ally
                                    </h5>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

HowItWorks.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HowItWorks);
