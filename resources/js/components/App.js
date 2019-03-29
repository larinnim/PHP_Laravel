import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from '../container/Home';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import PostJobProfile from '../container/PostJobProfile';
import ResponsiveDrawer from './Sidebar';
import SignIn from '../container/SignIn';
import AgentsOccupation from '../container/AgentsOccupation';
class App extends Component {
    render() {
        return (
            <BrowserRouter>
            <div>
              <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/post_job' component={PostJobProfile} />
                  <Route path='/login' component={SignIn} />
                  <Route path='/agents_occupations' component={AgentsOccupation} />
              </Switch>
            </div>
          </BrowserRouter>
        );
       
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
