import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Agents from '../Agents/Agents';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PostJobProfile from '../Agents/PostJobProfile';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/agents" exact component={Agents} />
                    <Route path="/post_job" exact component={PostJobProfile} />
                    {/* <Route path="/signup" component={Signup} />                                                                    
                    <Route path="/signin" component={Signin} /> */}
                </Switch>
            </BrowserRouter>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
