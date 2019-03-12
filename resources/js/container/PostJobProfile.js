import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Sidebar from '../components/Sidebar';


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
                    <Sidebar/>
            </div>
        );
      } 
}
ReactDOM.render(
    <PostJobProfile />,
    document.getElementById('root')
);
    