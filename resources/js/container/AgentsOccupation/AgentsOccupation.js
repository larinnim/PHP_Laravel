import React from 'react';
import Cards from '../../components/Cards';
import SidebarComponent from '../../components/Navigation/Sidebar';
import GoogleMaps from '../../components/GoogleMaps';
import './AgentsOccupation.css';
import Hidden from '@material-ui/core/Hidden';
import axios from 'axios';
import queryString from 'query-string'
import Autocomplete from '../../components/InputFields/Autocomplete';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import Typography from '@material-ui/core/Typography';
import Dropzone from '../../components/Dropzone';
import {connect} from 'react-redux';

const divStyle = {
  display: 'flex',
};
const topbar = {
  backgroundColor: 'white',
  marginBottom: 50,
};
const mov_right = {
  float: 'right',
}

class AgentsOccupation extends React.Component {
  _isMounted = false;

  state = {
    users: [],
    imgSrc: ''
 };

 componentDidMount() {
  this._isMounted = true;
  const values = queryString.parse(this.props.location.search)
  let url = '/api/occupations/agents?q=' + encodeURI(values.q);
      axios.get(url)
      .then(response => {
        response.data = response.data.sort((a, b) => (a.hourly_rate - b.hourly_rate))
        if (this._isMounted) {
          this.setState({        
            users: response.data
          });
        }
      })

      axios.get('/api/getImage')
      .then(response => {
        if (this._isMounted) {
          this.setState({imgSrc: response.data});
        }
        console.log(response);
      })
      .catch(error => console.log(error));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  sortByPriceAsc() {
    this.setState(prevState => {
      this.state.users.sort((a, b) => (a.hourly_rate - b.hourly_rate))
    });
  }

  sortByPriceDesc() {
    this.setState(prevState => {
      this.state.users.sort((a, b) => (b.hourly_rate - a.hourly_rate))
    });
  }

  sortByReview() {
    this.setState(prevState => {
      this.state.users.sort((a, b) => (b.rating - a.rating))
    });
  }

  handleChange = event => {
    if(event.target.value == 'sortByPriceAsc'){
      this.sortByPriceAsc();
    }
    else if (event.target.value == 'sortByPriceDesc'){
      this.sortByPriceDesc();
    }
    else if (event.target.value == 'sortByReview'){
      this.sortByReview();
    }
    this.setState({ [event.target.name]: event.target.value });
  };
    render() {
      return (
        <div>
            <SidebarComponent isLoggedIn={this.props.auth}/>
            <div style={topbar}>
              <Hidden smDown>
                <Typography>
                  1-48 of over 60,000 results for "bluetooth earbuds"
                </Typography>
              </Hidden>
              <div style={mov_right}>
                <Select native value={this.state.select} onChange={this.handleChange}>
                  <option value="none" disabled>Sort by:</option>
                  <option value="sortByPriceAsc">Price: Low to High</option>
                  <option value="sortByPriceDesc">Price: High to Low</option>
                  <option value="sortByReview">Avg. Customer Review</option>
                </Select>
              </div>
            </div>
            { this.state.users.map(user => 
              <article style={divStyle} key={user.id}>
                  <Cards
                  name={user.name} 
                  member_since={user.member_since} 
                  hourly_rate={user.hourly_rate} 
                  professions={user.professions} 
                  rating={user.rating} 
                  total_rating={user.total_rating} 
                  imgSrc={this.state.imgSrc}
                  />
                  <Hidden smDown>
                  <div className="DottedBox_content" style={{background: 'white'}}>
                  Your ally is located within this area:
                    <GoogleMaps                  
                    lat={parseFloat(user.latitude)} 
                    lng={parseFloat(user.longitude)} 
                    zoom={8} />
                  </div>
                </Hidden>
              </article>
            )}
            <Dropzone />
        </div>
      );
    }
}

const mapStateToProps = state => {
  return { 
    auth: state.auth.auth,
   };
};

export default  connect( mapStateToProps, null ) (AgentsOccupation);
