
import React from 'react';
import './Register/Register.css';
import SidebarComponent from '../../components/Sidebar';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class ForgotPass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
      }
    
    state = {
        email: ''
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
            [name]: value
          });
      }

      
    handleSubmit =  (event) => {
        console.log('email value' + this.state.email)
        event.preventDefault();
        this.props.onForgotPassword(this.state.email);
      }

    render(){
        return (
            <div className='wrapper'>
                <SidebarComponent isLoggedIn={this.props.auth}/>
                <div className='form-wrapper'>
                    <h2>Reset Password</h2>
                    <h4>You will receive a link to create a new password via email.</h4>
                    <form onSubmit={this.handleSubmit} noValidate>
                    <div className='email'>
                        <label htmlFor="email">Email<abbr title="Required">*</abbr></label>
                        <input id="email" autoComplete="email" autoFocus type='text' name='email' onChange={this.handleInputChange} noValidate />
                    </div>
                    <div className='submit'>
                        <button>Reset Password</button>
                    </div>
                    </form>
                </div>    
          </div>
    
        );
    }
}
const mapDispatchToProps = dispatch =>{ //receive the dispatch function as an argument
    return {
        onForgotPassword: (email) => dispatch(actions.forgotPassword(email)) //Dispatch function will be available on the onSign prop
    };
  };

  export default connect(null, mapDispatchToProps)(ForgotPass);