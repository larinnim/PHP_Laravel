import React from 'react';
import SidebarComponent from '../components/Sidebar';
import Layout from '../components/Layout/Layout';
import Autocomplete from '../components/Autocomplete';
import {connect} from 'react-redux';

class Home extends React.Component {

  render() {
    return (
      <div>
          <SidebarComponent isLoggedIn={this.props.auth}/>
          <Autocomplete />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    auth: state.auth.auth,
   };
};
export default  connect( mapStateToProps, null )( Home );
