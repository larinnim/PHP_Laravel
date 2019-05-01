import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Dropzone from "../../components/Dropzone";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";
import i18n from "../../i18n/index";
import { withTranslation } from "react-i18next";
import InputAdornment from "@material-ui/core/InputAdornment";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import * as actionTypes from "../../store/actions/actionTypes";
import * as actions from "../../store/actions/index";
import styles from "./Settings_Style";
import Grid from "@material-ui/core/Grid";
const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validPostalCodeRegexCA = RegExp(
    /([ABCEGHJKLMNPRSTVXY]\d)([ABCEGHJKLMNPRSTVWXYZ]\d){2}/i
);
const validPostalCodeRegexBR = RegExp(/^\d{5}-?\d{3}$/);

const validPhoneNumber = RegExp(/^[0-9\b]+$/);

const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};

const currencies = [
    {
        value: "BRL",
        label: "R$"
    },
    {
        value: "CAD",
        label: "CAD$"
    },
    {
        value: "USD",
        label: "USD$"
    }
];

class Settings extends React.Component {
    constructor(props) {
        super(props);
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
            mate: this.props.user.mate,
            country: this.props.user.country,
            errors: {
                name: "",
                email: "",
                cep: "",
                password: "",
                confirm_password: "",
                phone_number: "",
                city: "",
                state: "",
                country: "",
                address: ""
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
                address: false
            },
            professions: [],
            // professions: {
            gilad: true,
            jason: false,
            antoine: false
            // }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleEmptyForm() {
        console.log("handling fromm");
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
            }
            if (!this.state.cep) {
                errors_required.cep = true;
            }
            if (!this.state.email) {
                errors_required.email = true;
            }
            if (!this.state.password) {
                errors_required.password = true;
            }
            if (!this.state.confirm_password) {
                errors_required.confirm_password = true;
            }
            if (!this.state.phone_number) {
                errors_required.phone_number = true;
            }
            if (!this.state.country) {
                errors_required.country = true;
            }
            if (!this.state.city) {
                errors_required.city = true;
            }
            if (!this.state.state) {
                errors_required.state = true;
            }
            if (!this.state.address) {
                errors_required.address = true;
            }
            this.setState({ errors_required: errors_required });
            return false;
        } else {
            return true;
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const errors = this.state.errors;        
        switch (name) {
            case "name":
                errors.name =
                    value.length < 8
                        ? "Full Name must be 8 characters long!"
                        : "";
                break;
            case "email":
                errors.email = validEmailRegex.test(value)
                    ? ""
                    : "Email is not valid!";
                break;
            case "cep":
                errors.cep =
                    validPostalCodeRegexCA.test(value) ||
                    validPostalCodeRegexBR.test(value)
                        ? ""
                        : "You must enter a Canadian or Brazilian Postal Code!";
                break;
            case "phone_number":
                errors.phone_number = validPhoneNumber.test(value)
                    ? ""
                    : "Phone Number should contain only number";
                break;
            case "password":
                errors.password =
                    value.length < 8
                        ? "Password must be 8 characters long!"
                        : "";
                break;
            case "confirm_password":
                errors.confirm_password =
                    value == this.state.password
                        ? ""
                        : "The passwords doesn't match";
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value });

        this.setState({
            [name]: value
        });
    }

    handleChangeCheckbox = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleChangeSelect = name => event => {
        this.setState({
            country: event.target.value
        });
    };

    componentDidMount() {
        this._isMounted = true;

        axios.get("/api/occupations").then(response => {
            if (this._isMounted) {
                console.log(response.data);

                this.setState({
                    professions: response.data.map(suggestion => ({
                        value: suggestion.occupation,
                        label: suggestion.occupation
                    }))
                });

                const professions_html = response.data.map(profession => {
                    return (
                        // <div className="form-group">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.professions.profession}
                                    onChange={this.handleChangeCheckbox(
                                        profession
                                    )}
                                    value={profession}
                                />
                            }
                            label={profession}
                        />
                        // </div>
                    );
                });
            }
        });
    }

    updateProfile(event) {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("name", this.state.name);
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
                .post("/api/updateProfile/" + token, formData)
                .then(response => {
                    console.log(response);
                    return response;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    render() {
        const { errors, errors_required } = this.state;
        const { classes, user, t } = this.props;

        return (
            <div className={classes.grids}>
                <div className={classes.root}>
                    <Grid container spacing={40}>
                        <Grid item xs={12} md={3}>
                            <TextField
                                required
                                error={this.state.errors_required.name}
                                id="name"
                                name="name"
                                label="Full Name"
                                defaultValue={user.name}
                                className={classes.textField}
                                margin="normal"
                                variant="filled"
                                onChange={this.handleInputChange}
                            />
                            {errors.name.length > 0 && (
                                <span className={classes.error}>
                                    {t("register.fullname_error")}
                                </span>
                            )}
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                disabled
                                id="email"
                                name="email"
                                label="Email"
                                defaultValue={user.email}
                                className={classes.textField}
                                margin="normal"
                                variant="filled"
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                required
                                error={this.state.errors_required.password}
                                id="password"
                                name="password"
                                label="Password"
                                className={classes.textField}
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleInputChange}
                            />

                            {errors.password.length > 0 && (
                                <span className="error">
                                    {t("register.password_set")}
                                </span>
                            )}
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                required
                                error={
                                    this.state.errors_required.confirm_password
                                }
                                id="confirm-password"
                                label="Confirm Password"
                                className={classes.textField}
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleInputChange}
                            />
                            {errors.confirm_password.length > 0 && (
                                <span className="error">
                                    {t("register.confirm_password_error")}
                                </span>
                            )}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                error={this.state.errors_required.address}
                                id="address"
                                label="Address"
                                name="address"
                                defaultValue=""
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                required
                                error={this.state.errors_required.cep}
                                id="cep"
                                name="cep"
                                label="CEP"
                                defaultValue={user.postal_code}
                                className={classes.textField}
                                margin="normal"
                                variant="filled"
                                onChange={this.handleInputChange}
                            />
                            {errors.cep.length > 0 && (
                                <span className="error">
                                    {i18n.language == "pt-BR"
                                        ? t("register.postal_codeBR")
                                        : t("register.postal_codeCA")}
                                </span>
                            )}
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                required
                                error={this.state.errors_required.city}
                                id="city"
                                label="City"
                                name="city"
                                defaultValue={user.city}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                required
                                error={this.state.errors_required.state}
                                id="state"
                                label="State"
                                name="state"
                                defaultValue={user.state}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <InputLabel htmlFor="Country">Country* </InputLabel>
                            <Select
                                className={classes.textField}
                                required
                                error={this.state.errors_required.country}
                                native
                                value={this.state.country}
                                onChange={this.handleChangeSelect("country")}
                                inputProps={{
                                    name: "country",
                                    id: "country"
                                }}
                            >
                                <option value="" />
                                <option value={"Brazil"}>Brazil</option>
                                <option value={"Canada"}>Canada</option>
                                <option value={"US"}>US</option>
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={3}>
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

                            {errors.phone_number.length > 0 && (
                                <span className="error">
                                    {t("register.phone_number_error")}
                                </span>
                            )}
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                margin="normal"
                                className={classes.textField}
                                id="outlined-adornment-amount"
                                variant="outlined"
                                label="Hourly Rate"
                                value={this.state.amount}
                                onChange={this.handleInputChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {this.state.country == "Brazil"
                                                ? currencies[0].label
                                                : this.state.country == "Canada"
                                                ? currencies[1].label
                                                : currencies[2].label}
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormLabel component="legend" margin="normal">
                                What do you want to work with?
                            </FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.gilad}
                                            onChange={this.handleChangeCheckbox(
                                                "gilad"
                                            )}
                                            value="gilad"
                                        />
                                    }
                                    label="Agent"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.jason}
                                            onChange={this.handleChangeCheckbox(
                                                "jason"
                                            )}
                                            value="jason"
                                        />
                                    }
                                    label="HandyMate"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.antoine}
                                            onChange={this.handleChangeCheckbox(
                                                "antoine"
                                            )}
                                            value="Bartender"
                                        />
                                    }
                                    label="Antoine Llorca"
                                />
                                {this.professions_html}
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Dropzone />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button
                                variant="contained"
                                size="small"
                                className={classes.button}
                                onClick={e => this.updateProfile(e)}
                            >
                                <SaveIcon
                                    className={classNames(
                                        classes.leftIcon,
                                        classes.iconSmall
                                    )}
                                />
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

Settings.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        auth: state.auth.userData
    };
};

const mapDispatchToProps = dispatch => {
    //receive the dispatch function as an argument
    return {
        userData: () => dispatch(actions.getUserData()) //Dispatch function will be available on the onSign prop
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(withTranslation("common")(Settings)));
