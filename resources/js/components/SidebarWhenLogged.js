import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PersonOutline from "@material-ui/icons/PersonOutlineSharp";
import SettingsIcon from "@material-ui/icons/Settings";
import CalendarToday from "@material-ui/icons/CalendarToday";
import ExitToApp from "@material-ui/icons/ExitToAppOutlined";
import Link from '@material-ui/core/Link';
import Calendar from "./Navigation/Calendar";
import Settings from "./Navigation/Settings";
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import profilePicture from "../../img/profile.jpg";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import axios from 'axios';
import { throws } from 'assert';
import {connect} from 'react-redux';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    top:60,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    margin: 'auto'
    // marginLeft: 12,
    // marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    top:60,
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'contents',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  margin_left_sidebar:{
    marginLeft:20,
  },
  multilineColor:{
    color:'white',
    fontSize: 'x-large'
  },
  number_circle:{
    background:"#f50057 ",
    borderRadius:"0.8em",
    MozBorderRadius:"0.8em",
    WebkitBorderRadius:"0.8em",
    color:"#ffffff",
    display:"inline-block",
    fontWeight:"bold",
    lineHeight:"1.6em",
    marginRight:"5px",
    textAlign:"center",
    width:"1.6em"
  },
  upgradePlan:{
    float: "right",
    display: "inline-block",
    height: "auto",
    width: "auto",
    margin: "20px 40px 0 16px",
    boxSizing: "border-box",
    border: "transparent",
    borderRadius: "60px",
    fontFamily: "'Raleway', sans-serif",
    fontSize: "14px",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: "#ffffff",
    backgroundColor: "#f50057",
    cursor: "pointer",
    outline: "none",
    textAlign: 'center',
  },
  make_uppercase: {
    textTransform:"capitalize"
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  
});

class SidebarWhenLogged extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    tabs: [
      { id: 0, name: "Profile", show: true},
      { id: 1, name: "Messages", show: false},
      { id: 2, name: "Settings", show: false},
      { id: 3, name: "Calendar", show: false},
      { id: 4, name: "Logout", show: false}
    ],
    user: [{
      name: '',
      post_job: false,
      mate: false,
      email: '',
      postal_code: '',
      address: '',
      city: '',
      country: '',
      phone_number: ''
    }],
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleClick = (name, id) => {
    event.preventDefault();
    let tabs = [...this.state.tabs];     // create the copy of state array
    { tabs.map((element, index) => {
      return element.show ? tabs[index].show = false : null
    })}
    tabs[id].show = true;                  //new value
    this.setState({ open: false, tabs });  
  };

  renderSwitch(param) {
    switch(param.name) {
      case 'Profile':
        return 'Profile';
      case 'Messages':
        return 'Messages';
      case 'Settings':
      return <Settings key={param.id} user={this.state.user} />;
      // return <Settings key={param.id} />;
        // return 'Settings';
      case 'Calendar':
      return <Calendar key={param.id} />;

        // return <Calendar key={param.id} />;
        // return 'Calendar';
      case 'Logout':
        window.location = '/logout';
        // return 'Logout';
      default:
        return 'Profile';
    }
  }

  componentDidMount () {
    this._isMounted = true;
    // axios.get('/api/getUserData/' + token)
    //     .then(res => {
    //        const post_job_value = response.data.post_job ? true : false;
    //       const mate_value = response.data.mate ? true : false;
    //       const userData = [...this.state.user];
    //       userData.name = response.data.name;
    //       userData.post_job = post_job_value;
    //       userData.mate = mate_value;
    //       if (this._isMounted) {
    //         this.setState({user: userData});
    //       }
    //      });
    axios.get('/api/userInfo/' + this.props.token).then(response => {
        const user = response.data.user;
        const post_job_value = user.post_job ? true : false;
        const mate_value = user.mate ? true : false;
        const userData = [...this.state.user];
        userData.name = user.name,
        userData.email = user.email,
        userData.postal_code = user.postal_code,
        userData.address = user.address,
        userData.city = user.city,
        userData.country = user.country,
        userData.state = user.state,
        userData.phone_number= user.phone_number,
        userData.avatar= user.avatar,
        userData.post_job= user.post_job ? true : false,
        userData.mate= user.mate  ? true : false

        if (this._isMounted) {
          this.setState({user: userData});
        }
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { classes, theme } = this.props;
    const { open, tabs, user } = this.state;
    return (  
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
          <Typography
            className={classNames(classes.menuButton, open && classes.hide)}
          >
          <Link
            color="inherit"
            onClick={this.handleDrawerOpen}
            classes={{root: classes.multilineColor }}
          >
          { tabs.map((element, index) => {
            return element.show ? element.name : null
          })}
          </Link>
          </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
  
            <Card>
              <CardMedia src="profile.jpg" className={classes.margin_left_sidebar}>
                  {/* <img
                      src="https://s3.amazonaws.com/uifaces/faces/twitter/ok/128.jpg"
                      style={{ borderRadius: 100 }}
                  /> */}
                  {user.avatar ? 
                    <img
                      src={user.avatar}
                      style={{ borderRadius: 100, width: '50%' }}
                  />
                  : 
                  <img
                  src={profilePicture}
                  style={{ borderRadius: 100, width: '50%' }}
                  />
                  }
                  <p className={classes.make_uppercase}>{user.name}</p>
                  <div>
                <FormControlLabel
                value="Mate"
                checked={user.mate === true}
                control={<Radio color="primary" />}
                label="Mate"
                labelPlacement="start"
                />
                <FormControlLabel
                value="post_job"
                checked={user.post_job === true}
                control={<Radio color="primary"/>}
                label="Post Job"
                labelPlacement="start"
              />
                </div>
              </CardMedia>
            </Card>
          </div>
          <Divider />
          <List>  
            {tabs.map((item, index) => (
              <ListItem button key={item.id} onClick={this.handleClick.bind(this, item.name, item.id)}>
                     {(() => {
                      switch(index) {
                        case 0:
                          return <ListItemIcon><PersonOutline /></ListItemIcon>;
                        case 1:
                          return <ListItemIcon><MailIcon /></ListItemIcon>;
                        case 2:
                          return <ListItemIcon><SettingsIcon /></ListItemIcon>;
                        case 3:
                          return <ListItemIcon><CalendarToday /></ListItemIcon>;
                        case 4:
                          return <ListItemIcon><ExitToApp /></ListItemIcon>;
                        default:
                          return null;
                      }
                    })()}
                <ListItemText primary={item.name} />
                {index == 1 ?  <span className={classes.number_circle}>10</span>: null}
              </ListItem>
            ))}
            <span className={classes.upgradePlan}>Become a Post Job</span>
          </List>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />

          { tabs.map((element, index) => {
            return element.show ? this.renderSwitch(element) : null
          })}
        </main>
      </div>
    );
  }
}

SidebarWhenLogged.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  console.log(state);
  return { 
    token: state.auth.token,
    };
};

export default connect(mapStateToProps, null) (withStyles(styles, { withTheme: true })(SidebarWhenLogged));
