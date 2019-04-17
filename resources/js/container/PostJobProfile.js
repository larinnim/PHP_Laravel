import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SidebarComponent from '../components/Sidebar';


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
                    <SidebarComponent/>
            </div>
        );
      } 
}
ReactDOM.render(
    <PostJobProfile />,
    document.getElementById('root')
);
    