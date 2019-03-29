import React from 'react';
import Cards from '../components/Cards';
import ResponsiveDrawer from '../components/Sidebar';


class AgentsOccupation extends React.Component {

  render() {
    return (
      <div>
          <ResponsiveDrawer origin="home"/>
            <Cards />
      </div>
    );
  }
}


export default AgentsOccupation;
