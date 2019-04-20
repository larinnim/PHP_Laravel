
import React from 'react';
import './Register/Register.css';
import SidebarComponent from '../../components/Sidebar';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Grid from '@material-ui/core/Grid';

class ResponseReset extends React.Component {

    render(){
        return (
            <div>
                <SidebarComponent isLoggedIn={this.props.auth}/>
                <div className="check">
                    <div className="checkmark"></div>
                </div>
                <div className="reset_phrase">
                    <h2>Your password was successfully reset!</h2>
                    <h5>If you did not make this change, contact our support team.</h5>
                </div>
            </div>
        );
    }
}

export default ResponseReset;