import React from 'react';
import Cards from '../components/Cards';
import ResponsiveDrawer from '../components/Sidebar';
import GoogleMaps from '../components/GoogleMaps';
import './AgentsOccupation.css';
import Hidden from '@material-ui/core/Hidden';

const divStyle = {
  display: 'flex',
};

class AgentsOccupation extends React.Component {
  state = {
     lat: -34.397,
     lng: 150.644,
     zoom: 8
 };
  render() {
    return (
      <div>
          <ResponsiveDrawer origin="home"/>
          <article style={divStyle}>
            <Cards />
            <Hidden smDown>
              <div className="DottedBox_content" style={{background: 'white'}}>
              Your ally is located within this area:
                <GoogleMaps 
                lat={this.state.lat} 
                lng={this.state.lng} 
                zoom={this.state.zoom} />
              </div>
            </Hidden>
          </article>
      </div>
    );
  }
}


export default AgentsOccupation;
