import React from 'react';
import SidebarComponent from '../components/Sidebar';
import Layout from '../components/Layout/Layout';
import Autocomplete from '../components/Autocomplete';

class Home extends React.Component {

  render() {
    return (
      <div>
          <SidebarComponent origin="home"/>
          {/* <ResponsiveDrawer origin="home"/> */}
          {/* <Layout> */}
            <Autocomplete />
          {/* </Layout> */}
      </div>
    );
  }
}


export default Home;
