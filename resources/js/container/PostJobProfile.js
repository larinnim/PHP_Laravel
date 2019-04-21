import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SidebarComponent from '../components/Navigation/Sidebar';
import SidebarWhenLogged from '../components/SidebarWhenLogged';

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
                <SidebarWhenLogged />
                    {/* <SidebarComponent/> */}
            </div>
        );
      } 
}
ReactDOM.render(
    <PostJobProfile />,
    document.getElementById('root')
);
    