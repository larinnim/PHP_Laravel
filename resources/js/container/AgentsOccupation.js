import React from 'react';
import Cards from '../components/Cards';
import ResponsiveDrawer from '../components/Sidebar';
import GoogleMaps from '../components/GoogleMaps';
import './AgentsOccupation.css';
import Hidden from '@material-ui/core/Hidden';
import axios from 'axios';
import queryString from 'query-string'

const divStyle = {
  display: 'flex',
};

const agents = [
    {
    name: 'Jose Alencar',
    member_since: 'March 26, 2019',
    hourly_rate: '$ 98',
    professions: 'Agent, Baby Sitter',
    rating: 0,
    total_rating: 20,
    objectID: 0,
    lat: -34.397,
     lng: 150.644,
     zoom: 8
    },
    {
      name: 'Maria do Bairro',
      member_since: 'September 2, 2019',
      hourly_rate: '$ 1540',
      professions: 'Elderly Care',
      rating: 4,
      total_rating: 500,  
      objectID: 1,
      lat: 46.449340,
      lng: -80.982040,
      zoom: 8
      },

  ];
class AgentsOccupation extends React.Component {
  state = {
    users: []
    //  lat: -34.397,
    //  lng: 150.644,
    //  zoom: 8
 };

 componentDidMount() {
  const values = queryString.parse(this.props.location.search)
  console.log(values) // "top"

  let url = '/api/occupations/agents?q=' + encodeURI(values.q);
  axios.get(url)
    .then(response => {
      console.log(response.data);
      this.setState({users: response.data});
    })
    .catch(error => console.log(error));
}

  render() {
    return (
      <div>
          <ResponsiveDrawer origin="home"/>
          <div>
          { this.state.users.map(user => <li key={user.id} >{user.name}</li>)}
          </div>
          {agents.map(function(agent) {
            return <article style={divStyle} key={agent.objectID}>
              <Cards
              name={agent.name} 
              member_since={agent.member_since} 
              hourly_rate={agent.hourly_rate} 
              professions={agent.professions} 
              rating={agent.rating} 
              total_rating={agent.total_rating} 
              />
              <Hidden smDown>
              <div className="DottedBox_content" style={{background: 'white'}}>
              Your ally is located within this area:
                <GoogleMaps 
                lat={agent.lat} 
                lng={agent.lng} 
                zoom={agent.zoom} />
              </div>
            </Hidden>
            </article>;
          })}
      </div>
    );
  }
}


export default AgentsOccupation;
