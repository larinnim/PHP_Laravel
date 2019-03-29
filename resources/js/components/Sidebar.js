import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PrimarySearchAppBar from '../components/Navbar';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Navbar from '../components/Navbar';
import Calendar from './Calendar';
import Settings from './Settings';
import Button from '@material-ui/core/Button';
import hashHistory from 'react-router';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  appBar_home: {
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - 0px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  main_Tarefazz: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    color: 'white',
    lineHeight: 1.75,
    fontWeight: 500,
    textDecoration: 'unset',
    textTransform: 'uppercase',
  },
  flexGrow10: {
    flexGrow: 10,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 60,
    },
  },
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    tabs: [
        {id: 0,  name: 'Calendar', show: false},
        {id: 1, name: 'Settings', show: false}
    ], 
    home_tabs: [
        {id: 0,  name: 'Find an Ally', show: false},
        {id: 1, name: 'Job Bank', show: false},
        {id: 2, name: 'Register', show: false},
        {id: 3, name: 'Login', show: false, href: '/login'}
    ]
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleClickTab = (id) => {

      const tab_found = {...this.state.home_tabs[id]};
      window.location = tab_found.href;
      // tab_found.show = true;

      // const tabs = [...this.state.tabs];
      // tabs[id] = tab_found;
      // this.state.tabs.map((tabs, index) => (
      //     index == id ? tabs.show = true : tabs.show = false
      // ))
        
      // this.setState(state => ({ tabs: tabs}));
    };

    handleClickNav = href => {
      window.location = href;
    };

  render() {
    const { classes, theme } = this.props;
    
    console.log('Props' + this.props);
    const drawer = (
      <div>
        {/* <div className={classes.toolbar} /> */}
        {/* <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}   
        </List> */}
         {this.props.origin == 'home'?  
         null :
          <Card >
                <CardMedia src="profile.png">
                    <img src="https://s3.amazonaws.com/uifaces/faces/twitter/ok/128.jpg" style={{ borderRadius: 100 }} />
                    <p>Sebastiao Silva</p>
                </CardMedia>
            </Card> 
        }
        <Divider />
        <List>
            {this.props.origin == 'home'?   
             this.state.home_tabs.map((tabs, index) => (
            <ListItem button key={tabs.id} onClick={(event) => this.handleClickTab(event, tabs.id)}>
                <ListItemIcon>{index === 0 ? <CalendarToday /> : index === 1 ? <SettingsIcon/>:<MailIcon/>}</ListItemIcon>
              <ListItemText primary={tabs.name} />
            </ListItem>
          )) :  
          this.state.tabs.map((tabs, index) => (
            <ListItem button key={tabs.id} onClick={(event) => this.handleClickTab(event, tabs.id)}>
                <ListItemIcon>{index === 0 ? <CalendarToday /> : index === 1 ? <SettingsIcon/>:<MailIcon/>}</ListItemIcon>
              <ListItemText primary={tabs.name} />
            </ListItem>))
            }
          {/* {this.state.tabs.map((tabs, index) => (
            <ListItem button key={tabs.id} onClick={(event) => this.handleClickTab(event, tabs.id)}>
                <ListItemIcon>{index === 0 ? <CalendarToday /> : index === 1 ? <SettingsIcon/>:<MailIcon/>}</ListItemIcon>
              <ListItemText primary={tabs.name} />
            </ListItem>
          ))} */}
        </List>
    
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        {/* <PrimarySearchAppBar/> */}
    
   
        <AppBar position="fixed" style={{ background: 'black' }} className="appBar">
        <Toolbar>
        <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
        </IconButton>
        <a href="/" color="inherit" className={`${classes.flexGrow10} ${classes.main_Tarefazz}`}  >Tarefazz</a>
        {/* <Button onClick={() => this.handleClickNav('/')} color="inherit" className={classes.flexGrow10}>Tarefazz</Button> */}
        {/* <Typography variant="h6" color="inherit" className={classes.flexGrow10} noWrap>
          Tarefazz
        </Typography> */}
        <Hidden xsDown >
          <Button onClick={() => this.handleClickNav('/')} color="inherit">Find an Ally</Button>
          <Button onClick={() => this.handleClickNav('/')} color="inherit">Job Bank</Button>
          <Button onClick={() => this.handleClickNav('/')} color="inherit">Register</Button>
          <Button onClick={() => this.handleClickNav('/login')} color="inherit">Login</Button>
          <Navbar/>
        </Hidden>
        </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
         
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
         {this.props.origin == 'home' ? null :
             <Drawer
             classes={{
               paper: classes.drawerPaper,
             }}
             variant="permanent"
             open
           >        
           {drawer}
           </Drawer>
          }
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          { this.state.tabs.map((tabs, index) => (
              tabs.show == true && tabs.name == 'Calendar' ? <Calendar key={tabs.id} /> :  tabs.show == true && tabs.name == 'Settings' ? <Settings key={tabs.id}  /> : null
         ))}
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
