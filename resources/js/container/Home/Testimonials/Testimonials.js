import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import styles from "./Testimonials_Style";
import person1 from "../../../../img/person1.png";
import person2 from "../../../../img/person2.png";
import person3 from "../../../../img/person3.jpg";
import person4 from "../../../../img/person4.jpg";
function Testimonials(props) {
    const { classes } = props;
    return (
        <div className={classes.grids}>
            <div className={classes.root}>
                <Grid container spacing={40}>
                    <Grid item xs={12} md={3}>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="Recipe" src={person1} />
                                }
                                title="Thanks, Tarefazz! My toilet does not leak anymore.."
                                subheader="September 14, 2016"
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="Recipe" src={person2} />
                                }
                                title="Finally I've found a nurse to take care of my elderly mom."
                                subheader="September 14, 2016"
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="Recipe" src={person3} />
                                }
                                title="Tarefazz helped me to find a great english tutor for my brother."
                                subheader="September 14, 2016"
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="Recipe" src={person4} />
                                }
                                title="I've never been so busy since I've created a profile in Tarefazz!"
                                subheader="September 14, 2016"
                            />
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

Testimonials.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Testimonials);
