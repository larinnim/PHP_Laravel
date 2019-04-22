import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SidebarComponent from '../components/Navigation/Sidebar';
import SidebarWhenLogged from '../components/SidebarWhenLogged';

export default class PostJobProfile extends Component{ 
      render() {
        return (
            <div>
                <SidebarWhenLogged />
                    {/* <SidebarComponent/> */}
            </div>
        );
      } 
}
