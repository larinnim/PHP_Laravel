import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';
import NavApp from '../components/NavApp';
import ResponsiveDrawer from '../components/Sidebar';
import Layout from '../components/Layout/Layout';
import Autocomplete from '../components/Autocomplete';

class Home extends React.Component {

  render() {
    return (
      <div>
          <Layout>
            <Autocomplete />
          </Layout>
      </div>
    );
  }
}


export default Home;
