import React from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

export default function PrivateRoute ({component: Component, authed, ...rest}) {
    console.log("Private Route")
    return (
      <Route
        {...rest}
        render={(props) => authed === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }