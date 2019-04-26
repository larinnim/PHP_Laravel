import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Dropzone from '../../components/Dropzone';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';

import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validPostalCodeRegexCA = RegExp(
  /([ABCEGHJKLMNPRSTVXY]\d)([ABCEGHJKLMNPRSTVWXYZ]\d){2}/i
);
const validPostalCodeRegexBR = RegExp(/^\d{5}-?\d{3}$/);

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

class Settings extends React.Component {
  constructor(props) {
    super(props);
    console.log('USERRR'+this.props.email);
    this.state = {
      name: this.props.user.name,
      email: this.props.user.email,
      cep: this.props.user.postal_code,
      password: this.props.user.password,
      confirm_password: this.props.user.confirm_password,
      phone_number: this.props.user.password,
      city: this.props.user.city,
      state: this.props.user.state,
      country: this.props.user.country,
      address: this.props.user.address,
      errors: {
        name: "",
        email: "",
        cep: "",
        password: "",
        phone_number: "",
        city: "",
        state: "",
        country: "",
        address: "",
      },
      errors_required: {
        name: false,
        email: false,
        cep: false,
        password: false,
        confirm_password: false,
        phone_number: false,
        city: false,
        state: false,
        country: false,
        address: false,
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleEmptyForm() {
    console.log('handling fromm')
    let errors_required = this.state.errors_required;

    if (
        !this.state.name ||
        !this.state.cep ||
        !this.state.email ||
        !this.state.password ||
        !this.state.state ||
        !this.state.country ||
        !this.state.address ||
        !this.state.phone_number
    ) {
        if (!this.state.name) {
            errors_required.name = true;
        } if (!this.state.cep) {
            errors_required.cep = true;
        }  if (!this.state.email) {
            errors_required.email = true;
        }  if (!this.state.password) {
            errors_required.password = true;
        }   if (!this.state.confirm_password) {
          errors_required.confirm_password = true;
      } if (!this.state.phone_number) {
          errors_required.phone_number = true;           
        }  if (!this.state.country) {
            errors_required.country = true;
        } if (!this.state.city) {
          errors_required.city = true;
      }  if (!this.state.state) {
          errors_required.state = true;
      }  if (!this.state.address) {
        errors_required.address = true;
    }
    this.setState({
      ...errors_required
    });
        return false;
    } else {
        return true;
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
        [name]: value
      });
  }

  updateProfile(event) {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append("email", this.state.email);
    formData.append("cep", this.state.cep);
    formData.append("password", this.state.password);
    formData.append("phone_number", this.state.phone_number);
    formData.append("city", this.state.city);
    formData.append("state", this.state.state);
    formData.append("country", this.state.country);
    formData.append("address", this.state.address);

    if (validateForm(this.state.errors) && this.handleEmptyForm()) {
      axios
      .post("/api/updateProfile/"+token, formData)
      .then(response => {
        console.log(response)
      return response;
      })
      .catch(error => {
          console.log(error);
      });
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const {
      errors,
      errors_required,
    } = this.state;
    const { classes, user } = this.props;

    return (
      // <form className={classes.container} noValidate autoComplete="off" onSubmit={e => this.updateProfile(e)}>
      <form className={classes.container} noValidate autoComplete="off" >

        <TextField
          id="outlined-name"
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
          onChange={this.handleInputChange}
        />

        <TextField
          required
          error={this.state.errors_required.name}
          id="nome"
          label="Full Name"
          defaultValue={user.name}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={this.handleInputChange}
        />

        <TextField
          disabled
          id="email"
          label="Email"
          defaultValue={user.email}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={this.handleInputChange}
        />

        <TextField
          required
          error={this.state.errors_required.cep}
          id="cep"
          label="CEP"
          defaultValue={user.postal_code}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={this.handleInputChange}
        />

        <TextField
          required
          error={this.state.errors_required.password}
          id="password"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          onChange={this.handleInputChange}
        />

        <TextField
          required
          error={this.state.errors_required.confirm_password}
          id="confirm-password"
          label="Confirm Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          onChange={this.handleInputChange}
        />

        <TextField
          required
          error={this.state.errors_required.phone_number}
          id="phone_number"
          label="Phone Number"
          name="phone_number"
          defaultValue={user.phone_number}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={this.handleInputChange}
        />

        <TextField
          required
          error={this.state.errors_required.address}
          id="address"
          label="Address"
          defaultValue=""
          className={user.address}
          margin="normal"
          variant="outlined"
          onChange={this.handleInputChange}
        />

        <TextField
          required
          error={this.state.errors_required.city}
          id="city"
          label="City"
          defaultValue={user.city}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={this.handleInputChange}
        />

        <TextField
          required
          error={this.state.errors_required.state}
          id="state"
          label="State"
          defaultValue={user.state}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={this.handleInputChange}
        />

        <TextField
          required
          error={this.state.errors_required.country}
          id="country"
          label="Country"
          defaultValue={user.country}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={this.handleInputChange}
        />

        <div>
          <Dropzone />
        </div>
        {/* <button>Send data!</button> */}
        {/* <Button variant="contained"  size="small" className={classes.button}> */}

        <Button variant="contained"  size="small" className={classes.button} onClick={e => this.updateProfile(e)}>
        {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
        <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
        Save
      </Button>

    {/* <TextField
      error
      id="outlined-error"
      label="Error"
      defaultValue="Hello World"
      className={classes.textField}
      margin="normal"
      variant="outlined"
    />

        <TextField
          disabled
          id="outlined-disabled"
          label="Disabled"
          defaultValue="Hello World"
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-email-input"
          label="Email"
          className={classes.textField}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          className={classes.textField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />

        <TextField
          id="outlined-dense"
          label="Dense"
          className={classNames(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
        />

        <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          rowsMax="4"
          value={this.state.multiline}
          onChange={this.handleChange('multiline')}
          className={classes.textField}
          margin="normal"
          helperText="hello"
          variant="outlined"
        />

        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows="4"
          defaultValue="Default Value"
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-helperText"
          label="Helper text"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-with-placeholder"
          label="With placeholder"
          placeholder="Placeholder"
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-number"
          label="Number"
          value={this.state.age}
          onChange={this.handleChange('age')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-search"
          label="Search field"
          type="search"
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          className={classes.textField}
          value={this.state.currency}
          onChange={this.handleChange('currency')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your currency"
          margin="normal"
          variant="outlined"
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency-native"
          select
          label="Native select"
          className={classes.textField}
          value={this.state.currency}
          onChange={this.handleChange('currency')}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your currency"
          margin="normal"
          variant="outlined"
        >
          {currencies.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="outlined-full-width"
          label="Label"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id="outlined-bare"
          className={classes.textField}
          defaultValue="Bare"
          margin="normal"
          variant="outlined"
        /> */}
      </form>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return { 
    auth: state.auth.userData,
    };
};

const mapDispatchToProps = dispatch =>{ //receive the dispatch function as an argument
  return {
    userData: () => dispatch(actions.getUserData()) //Dispatch function will be available on the onSign prop
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(Settings));
