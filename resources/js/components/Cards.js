import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Rating  from 'material-ui-rating';
import GoogleMaps from './GoogleMaps';
import Moment from 'react-moment';

const styles = theme => ({
  card: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    [theme.breakpoints.up('sm')]: {
      width: '40%',
      marginRight: 2,
    },
    // width: '40%'
    // maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },    
  avatar: {
    backgroundColor: red[500],
  },
 capitalize: {
  textTransform: 'capitalize',
 },
  margin_right: {
    marginRight: 30,
  },   
});

  var Cards_func =  function Cards (props) {
    const { name, member_since, hourly_rate, professions, classes, rating, total_rating } = props;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" src="img/default.png"  className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton>
              <FavoriteIcon/>
            </IconButton>
          }
          title={name}
          subheader={
            <Typography variant="caption" gutterBottom>
              Member Since:         <Moment format="MMMM Do YYYY">{member_since}</Moment>
          </Typography>}
        />
        {/* <CardMedia
          className={classes.media}
          image="img/default.png"
          title="Paella dish"
        /> */}
        <CardContent className={classes.actions} >
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
            {
              JSON.parse(professions).map(function (profession, index) {
                return (
                  <ul key={index}>
                  <li className={classes.capitalize}>
                    {profession}
                  </li>
                </ul>
                )
              })
            }
          </div>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          {/* <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton> */}
          <Rating
            value={rating}
            max={5}
            onChange={(value) => console.log(`Rated with value ${value}`)}
          />
          <div>
            ({total_rating} ratings)
          </div>
          {/* <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton> */}
        </CardActions>
        {/* <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
              minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
              heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
              browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
              chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
              salt and pepper, and cook, stirring often until thickened and fragrant, about 10
              minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
              without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
              to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
              minutes more. (Discard any mussels that don’t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography>
          </CardContent>
        </Collapse> */}
      </Card>
    );
  }
  export default withStyles( styles ) (Cards_func);
// }

// Cards.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(Cards);
