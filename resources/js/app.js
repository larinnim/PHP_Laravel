import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from './container/Home';
import { BrowserRouter, Route, Switch, withRouter,Link } from 'react-router-dom'
import PostJobProfile from './container/PostJobProfile';
import SignIn from './container/Auth/SignIn';
import Logout from './container/Auth/Logout';
import AgentsOccupation from './container/AgentsOccupation/AgentsOccupation';
import Register from './container/Auth/Register/Register';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/index';
import {createStore, compose, applyMiddleware} from 'redux';
import reducer from './store/reducers/reducer';
import authReducer from './store/reducers/auth';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import combineReducers from 'combine-reducers';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <I18nextProvider i18n={i18n}>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/post_job' component={PostJobProfile} />
                            <Route exact path='/login' component={withRouter(SignIn)} />
                            <Route exact path='/logout' component={withRouter(Logout)} />
                            <Route exact path='/agents_occupations' component={withRouter(AgentsOccupation)} />
                            <Route exact path='/register' component={withRouter(Register)} />
                        </Switch>
                    </I18nextProvider>
                </BrowserRouter>
            </div>
        );
    }
}
// console.log('AuthReducer: ' + authReducer.auth);

// const rootReducer = combineReducers({
//     // reducer: reducer,
//     auth: authReducer
// });

// const logger = store => {
//     return next => {
//         return action => {
//             console.log('[Middleware] Dispatching', action);
//             const result = next(action);
//             console.log('[Middleware] next state', store.getState());
//             return result;
//         }
//     }
// }; 
// const composerEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(rootReducer, composerEnhancers(applyMiddleware(thunk)));

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};
export default App;

