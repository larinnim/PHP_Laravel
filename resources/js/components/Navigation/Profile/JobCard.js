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
import axios from "axios";
import CardDiv from './Card';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class JobCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  setCards = (data) => {
    console.log('here');
    // <div><CardDiv /></div>
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    axios.get('/api/ally_job/' + token)
        .then(res => {
          // $data = res.data;
          this.setCards(res.data);
          // var pending_cards = [];
          // for(let i = 0; i < data.length; i++){
          //   if(data[i].pending){
          //     var temp = (<div><Card 
          //       avatar={data[i].avatar} member_since={data[i].member_since} payment_amount={data[i].payment_amount}
          //       rating={data[i].rating} total_rating={data[i].total_rating}
          //     /></div>);
          //     pending_cards.push(temp);
          //   }
          // }
        });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>                      
              {this.setCards()}
      </div>
      // <Card className={classes.card}>
      //   <CardHeader
      //     avatar={
      //       <Avatar aria-label="Recipe" className={classes.avatar}>
      //         R
      //       </Avatar>
      //     }
      //     action={
      //       <IconButton>
      //         <MoreVertIcon />
      //       </IconButton>
      //     }
      //     title="Shrimp and Chorizo Paella"
      //     subheader="September 14, 2016"
      //   />
      //   <CardMedia
      //     className={classes.media}
      //     image="/static/images/cards/paella.jpg"
      //     title="Paella dish"
      //   />
      //   <CardContent>
      //     <Typography component="p">
      //       This impressive paella is a perfect party dish and a fun meal to cook together with your
      //       guests. Add 1 cup of frozen peas along with the mussels, if you like.
      //     </Typography>
      //   </CardContent>
      //   <CardActions className={classes.actions} disableActionSpacing>
      //     {/* <IconButton aria-label="Add to favorites">
      //       <FavoriteIcon />
      //     </IconButton>
      //     <IconButton aria-label="Share">
      //       <ShareIcon />
      //     </IconButton> */}
      //     <IconButton
      //       className={classnames(classes.expand, {
      //         [classes.expandOpen]: this.state.expanded,
      //       })}
      //       onClick={this.handleExpandClick}
      //       aria-expanded={this.state.expanded}
      //       aria-label="Show more"
      //     >
      //       <ExpandMoreIcon />
      //     </IconButton>
      //   </CardActions>
      //   <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
      //     <CardContent>
      //     </CardContent>
      //   </Collapse>
      // </Card>
    );
  }
}

JobCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobCard);
