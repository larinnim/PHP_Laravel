import React from "react";
import Cards from "../../components/Cards";
import SidebarComponent from "../../components/Navigation/Sidebar/Sidebar";
import GoogleMaps from "../../components/GoogleMaps";
import "./AgentsOccupation.css";
import Hidden from "@material-ui/core/Hidden";
import axios from "axios";
import queryString from "query-string";
import Autocomplete from "../../components/InputFields/Autocomplete";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import Typography from "@material-ui/core/Typography";
import Dropzone from "../../components/Dropzone";
import { connect } from "react-redux";
import Paper from '@material-ui/core/Paper';
import Register from '../Auth/Register/Register';

const divStyle = {
    display: "flex"
};
const topbar = {
    backgroundColor: "white",
    marginBottom: 50
};
const mov_right = {
    float: "right"
};

class AgentsOccupation extends React.Component {
    _isMounted = false;

    state = {
        users: [],
        professions: [],
        imgSrc: "",
        latitude: '',
        longitude: '',
    };

    componentDidMount() {
        this._isMounted = true;
        const values = queryString.parse(this.props.location.search);
        let url = "/api/occupations/agents?q=" + encodeURI(values.q);
        const _this = this; 
 
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                    var latitude =  position.coords.latitude;
                    var longitude = position.coords.longitude;

                    axios.get(url, {
                        params: {
                          latitude: latitude,
                          longitude: longitude
                        }
                      }).then(response => {
                        // axios.get(url).then(response => {
                        var user_and_profession = response.data.user_and_profession;
                        var professionByUser = response.data.professionByUser;
                            if (_this._isMounted) {
                                user_and_profession.map(function (user, index){
                                    if(user.avatar != null) {
                                        axios
                                        .get("/api/getImage/"+ user.user_id)
                                        .then(response => {
                                            user_and_profession[index]['avatar'] = response.data;
                                                _this.setState({
                                                    users: user_and_profession,
                                                });
                                        })
                                        .catch(error => console.log(error))
                                        _this.setState({
                                            users: user_and_profession,
                                            professions: professionByUser
                                        });
                                    }
                                    else {
                                        _this.setState({
                                            users: user_and_profession,
                                            professions: professionByUser
                                        });
                                    }
                                });
                            }
                    });
            }, 
            function(error) {
                axios.get(url).then(response => {
                    var user_and_profession = response.data.user_and_profession;
                            var professionByUser = response.data.professionByUser;
                                if (_this._isMounted) {
                                    user_and_profession.map(function (user, index){
                                        if(user.avatar != null) {
                                            axios
                                            .get("/api/getImage/"+ user.user_id)
                                            .then(response => {
                                                user_and_profession[index]['avatar'] = response.data;
                                                    _this.setState({
                                                        users: user_and_profession,
                                                    });
                                            })
                                            .catch(error => console.log(error))
                                            _this.setState({
                                                users: user_and_profession,
                                                professions: professionByUser
                                            });
                                        }
                                    });
                                }
                            });
              })
        }
     
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    sortByPriceAsc() {
        this.setState(prevState => {
            this.state.users.sort((a, b) => a.price - b.price);
            // this.state.users.sort((a, b) => a.hourly_rate - b.hourly_rate);
        });
    }

    sortByPriceDesc() {
        const _this = this; 
        this.setState(prevState => {
            _this.state.users.sort((a, b) => b.price - a.price);
        });
    }

    sortByReview() {
        this.setState(prevState => {
            this.state.users.sort((a, b) => b.rating - a.rating);
        });
    }

    handleChange = event => {
        if (event.target.value == "sortByPriceAsc") {
            this.sortByPriceAsc();
        } else if (event.target.value == "sortByPriceDesc") {
            this.sortByPriceDesc();
        } else if (event.target.value == "sortByReview") {
            this.sortByReview();
        }
        this.setState({ [event.target.name]: event.target.value });
    };

    agent_occupation_html = (props) => {
            if(this._isMounted){
                if(this.state.users.length > 0){
                    return (this.state.users.map(user => (
                        <article style={divStyle} key={user.user_id}>
                        <Cards
                            name={user.name}
                            member_since={user.member_since}
                            hourly_rate={user.price}
                            country={user.country}
                            professions={this.state.professions[user.user_id]}
                            rating={user.rating}
                            total_rating={user.total_rating}
                            imgSrc={user.avatar}
                            id={user.user_id}
                        />
                        <Hidden smDown>
                            <div
                                className="DottedBox_content"
                                style={{ background: "white" }}
                            >
                                Your ally is located within this area:
                                <GoogleMaps
                                    lat={parseFloat(user.latitude)}
                                    lng={parseFloat(user.longitude)}
                                    zoom={8}
                                />
                            </div>
                        </Hidden>
                    </article>
                )));
            }
            else {
                return (<Register agentNotFound={true} location={queryString.parse(this.props.location.search).q}/>);
            }
        }
    }

    render() {
        return (
            <div>
                <SidebarComponent isLoggedIn={this.props.auth} />
                <div style={topbar}>
                    <Hidden smDown>
                        <Typography>
                            We've found {this.state.users.length} results for "{queryString.parse(this.props.location.search).q}"
                        </Typography>
                    </Hidden>
                    <div style={mov_right}>
                        <Select
                            native
                            value={this.state.select}
                            onChange={this.handleChange}
                        >
                            <option value="none" disabled>
                                Sort by:
                            </option>
                            <option value="sortByPriceAsc">
                                Price: Low to High
                            </option>
                            <option value="sortByPriceDesc">
                                Price: High to Low
                            </option>
                            <option value="sortByReview">
                                Avg. Customer Review
                            </option>
                        </Select>
                    </div>
                </div>
                {this.agent_occupation_html()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth.auth
    };
};

export default connect(
    mapStateToProps,
    null
)(AgentsOccupation);
