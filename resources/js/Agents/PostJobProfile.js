import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Sidebar_func from '../components/Sidebar';
import Agents from './Agents';
import Grid from '@material-ui/core/Grid';
import ResponsiveDrawer from '../components/Sidebar';
import PrimarySearchAppBar from '../components/Navbar';


export default class PostJobProfile extends Component{
    state = {
        tabs: [
            {name: "Choose Ally", href: "/"},
            {name: "Calendar", href: "/"},
            {name: "Edit Profile", href: "/"}
        ],
    };     
      render() {
        return (
            <div>
                <Grid item xs={12}>
                    {/* <PrimarySearchAppBar/> */}
                    <ResponsiveDrawer/>
                    {/* <Sidebar_func tab={this.state.tabs}/> */}
                    <Agents/>
                </Grid>
            </div>
        );
      } 
}
ReactDOM.render(
    <PostJobProfile />,
    document.getElementById('root')
);
    