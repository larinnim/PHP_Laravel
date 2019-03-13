import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from '../container/Home';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import PostJobProfile from '../container/PostJobProfile';
import ResponsiveDrawer from './Sidebar';
import SignIn from '../container/SignIn';
class App extends Component {
    render() {
        return (
            <BrowserRouter>
            <div>
              <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/post_job' component={PostJobProfile} />
                  <Route path='/register' component={SignIn} />
              </Switch>
            </div>
          </BrowserRouter>
        );
       
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
