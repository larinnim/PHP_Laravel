
import React from 'react';
import './Register/Register.css';
import SidebarComponent from '../../components/Sidebar';

export default class ForgotPass extends React.Component {
    render(){
        return (
            <div className='wrapper'>
                <SidebarComponent isLoggedIn={this.props.auth}/>
                <div className='form-wrapper'>
                    <h2>Reset Password</h2>
                    <h4>You will receive a link to create a new password via email.</h4>
                    <form onSubmit={this.handleSubmit} noValidate>
                    <div className='fullName'>
                        <label htmlFor="fullName">Email<abbr title="Required">*</abbr></label>
                        <input type='text' name='fullName' noValidate />
                    </div>
                    </form>
                    <div className='submit'>
                        <button>Reset Password</button>
                    </div>
                </div>    
          </div>
    
        );
    }
}