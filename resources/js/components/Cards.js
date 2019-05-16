import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Rating from "material-ui-rating";
import GoogleMaps from "./GoogleMaps";
import Moment from "react-moment";
import Button from "@material-ui/core/Button";
import "./Cards.css";
import AvailableTime from "../container/AgentsOccupation/AvailableTime/AvailableTime";
const styles = theme => ({
    card: {
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 20,
        [theme.breakpoints.up("sm")]: {
            width: "40%",
            marginRight: 2
        }
        // width: '40%'
        // maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    actions: {
        display: "flex"
    },
    rating_display: {
        width: 20,
        display: "inline-flex"
    },
    rating_text: {
        minWidth: 100,
        marginTop: 10
    },
    avatar: {
        backgroundColor: red[500]
    },
    capitalize: {
        textTransform: "capitalize"
    },
    margin_right: {
        marginRight: 30
    },
    iconHover: {
        "&:hover": {
            color: red[800]
        }
    },
    
});

var Cards_func = function Cards(props) {
    const {
        name,
        member_since,
        hourly_rate,
        professions,
        classes,
        rating,
        total_rating,
        imgSrc
    } = props;
    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar
                        aria-label="Recipe"
                        src={imgSrc}
                        className={classes.avatar}
                    >
                        R
                    </Avatar>
                }
                action={
                    <IconButton>
                        <FavoriteIcon className={classes.iconHover} />
                    </IconButton>
                }
                title={name}
                subheader={
                    <Typography variant="caption" gutterBottom>
                        Member Since:{" "}
                        <Moment format="MMMM Do YYYY">{member_since}</Moment>
                    </Typography>
                }
            />
            <CardContent className={classes.actions}>
                <div className={classes.margin_right}>
                    <Typography variant="caption" gutterBottom>
                        Hourly Rate:
                    </Typography>
                    <Typography variant="subheading" gutterBottom>
                        $ {hourly_rate}
                    </Typography>
                </div>
                <div>
                    <Typography variant="caption" gutterBottom>
                        Professions:
                    </Typography>
                    {/* <Typography variant="subheading" gutterBottom> */}
                    {JSON.parse(professions).map(function(profession, index) {
                        return (
                            <ul key={index}>
                                <li className={classes.capitalize}>
                                    {profession}
                                </li>
                            </ul>
                        );
                    })}
                </div>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
                {/* <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton> */}
                <span className={classes.rating_text}>
                    ({total_rating} ratings)
                </span>

                <Rating
                    value={rating}
                    max={5}
                    onChange={value => console.log(`Rated with value ${value}`)}
                    // style={{ backgroundColor: 'black' }}
                    classes={{ root: "rating_display" }}
                />
            </CardActions>
            <CardContent>
                <AvailableTime></AvailableTime>
            </CardContent>
        </Card>
    );
};
export default withStyles(styles)(Cards_func);
// }

// Cards.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(Cards);
