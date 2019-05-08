import React, { Component } from 'react';
import SidebarWhenLogged from '../components/Navigation/Sidebar/SidebarWhenLogged';

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
