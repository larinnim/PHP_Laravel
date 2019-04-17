import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from '../container/Home';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import PostJobProfile from '../container/PostJobProfile';
import SignIn from '../container/SignIn';
import AgentsOccupation from '../container/AgentsOccupation/AgentsOccupation';
import Register from '../container/Register/Register';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/index';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
            <div>
            <I18nextProvider i18n={i18n}>
              <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/post_job' component={PostJobProfile} />
                  <Route path='/login' component={SignIn} />
                  <Route path='/agents_occupations' component={AgentsOccupation} />
                  <Route path='/register' component={Register} />
              </Switch>
            </I18nextProvider>

            </div>
          </BrowserRouter>
        );
       
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
