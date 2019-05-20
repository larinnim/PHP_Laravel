import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Dropzone from "../../Dropzone";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";
import i18n from "../../../i18n/index";
import { withTranslation } from "react-i18next";
import InputAdornment from "@material-ui/core/InputAdornment";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import * as actionTypes from "../../../store/actions/actionTypes";
import * as actions from "../../../store/actions/index";
import styles from "./Settings_Style";
import Grid from "@material-ui/core/Grid";

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
            phone_number: this.props.user.phone_number,
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
                address: false,
                hourly_error: []
            },
            checkbox_professions: {},
            professions: [],
            hourly_amount: []
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleHourlyInputChange = this.handleHourlyInputChange.bind(this);
    }

    handleEmptyHour() {
        let valid = true;
        let hourly = this.state.hourly_amount;
        let checkbox_var = this.state.checkbox_professions;

        let hourly_empty = this.state.errors_required.hourly_error;

        Object.keys(this.state.checkbox_professions).forEach(function(
            item,
            index
        ) {
            if (checkbox_var[item] && !hourly[item]) {
                hourly_empty[item] = true;
                valid = false;
            }
        });

        this.setState(prevState => ({
            errors_required: {
                ...prevState.errors_required,
                hourly_error: hourly_empty
            }
        }));

        return valid;
    }

    handleEmptyForm() {
        let errors_required = this.state.errors_required;

        if (
            !this.state.name ||
            !this.state.cep ||
            !this.state.email ||
            !this.state.state ||
            !this.state.country ||
            !this.state.city ||
            !this.state.address ||
            !this.state.phone_number ||
            !this.state.phone_number ||
            this.state.password ||
            this.state.confirm_password
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
            if (!this.state.password && this.state.confirm_password) {
                errors_required.password = true;
            }
            if (this.state.password && !this.state.confirm_password) {
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

    handleHourlyInputChange(event) {
        const target = event.target;
        const value = target.value;
        const id = target.id;
        let hourly_error = this.state.errors_required.hourly_error;
        hourly_error[id] = false;

        this.setState(prevState => ({
            hourly_amount: {
                ...prevState.hourly_amount,
                [id]: value
            }
        }));

        this.setState(prevState => ({
            errors_required: {
                ...prevState.errors_required,
                hourly_error: hourly_error
            }
        }));
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const errors = this.state.errors;
        switch (name) {
            case "name":
                errors.name = value.length < 8 ? true : false;
                this.setState(prevState => ({
                    errors_required: {
                        ...prevState.errors_required,
                        name: false
                    }
                }));
                break;
            case "cep":
                errors.cep =
                    validPostalCodeRegexCA.test(value) ||
                    validPostalCodeRegexBR.test(value)
                        ? true
                        : false;
                this.setState(prevState => ({
                    errors_required: {
                        ...prevState.errors_required,
                        cep: false
                    }
                }));
                break;
            case "phone_number":
                errors.phone_number = validPhoneNumber.test(value)
                    ? false
                    : true;
                this.setState(prevState => ({
                    errors_required: {
                        ...prevState.errors_required,
                        phone_number: false
                    }
                }));
                break;
            case "password":
                errors.password = value.length < 8 ? true : false;
                break;
            case "confirm_password":
                errors.confirm_password =
                    value == this.state.password ? true : false;
                break;
            case "address":
                this.setState(prevState => ({
                    errors_required: {
                        ...prevState.errors_required,
                        address: false
                    }
                }));
                break;
            case "city":
                this.setState(prevState => ({
                    errors_required: {
                        ...prevState.errors_required,
                        city: false
                    }
                }));
                break;
            case "state":
                this.setState(prevState => ({
                    errors_required: {
                        ...prevState.errors_required,
                        state: false
                    }
                }));
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
        const checkbox_professions = this.state.checkbox_professions;
        checkbox_professions[name] = event.target.checked;

        if (!event.target.checked) {
            const change_hourlyArr = this.state.hourly_amount;
            // delete change_hourlyArr[name];
            change_hourlyArr[name] = "";

            this.setState({ hourly_amount: change_hourlyArr });
        }

        this.setState({ checkbox_professions: checkbox_professions });
    };

    handleChangeSelect = name => event => {
        this.setState({
            country: event.target.value
        });
        this.setState(prevState => ({
            errors_required: {
                ...prevState.errors_required,
                country: false
            }
        }));
    };

    componentDidMount() {
        this._isMounted = true;

        axios.get("/api/occupations").then(response => {
            if (this._isMounted) {
                const var_checkbox_professions = [];
                const var_hourly_amount = [];
                const var_hourly_error = [];
                this.setState({ professions: response.data });

                this.state.professions.map(
                    (profession, index) => (
                        (var_checkbox_professions[
                            profession.occupation
                        ] = this.props.hourly_price.hasOwnProperty(
                            profession.occupation
                        )
                            ? true
                            : false),
                        (var_hourly_amount[
                            profession.occupation
                        ] = this.props.hourly_price.hasOwnProperty(
                            profession.occupation
                        )
                            ? this.props.hourly_price[profession.occupation]
                            : ""),
                        (var_hourly_error[profession.occupation] = false)
                    )
                );
                this.setState({
                    checkbox_professions: var_checkbox_professions
                });
                this.setState({ hourly_amount: var_hourly_amount });
                this.setState(prevState => ({
                    errors_required: {
                        ...prevState.errors_required,
                        hourly_error: var_hourly_error
                    }
                }));

                var sortable = [];
                for (var profession in this.state.checkbox_professions) {
                    sortable.push([
                        profession,
                        this.state.checkbox_professions[profession]
                    ]);
                }

                sortable.sort(function(a, b) {
                    return a[1] - b[1];
                });
                this.setState({ professions: sortable });

                // keys = Object.keys(_this2.state.checkbox_professions)
                // values = keys.map(function (k) { return _this2.state.checkbox_professions[k]; });

                // values.sort(function(x, y) {
                // true values first
                // return (x === y)? 0 : x? -1 : 1;
                // false values first
                // return (x === y)? 0 : x? 1 : -1;
                // });
                // var professions_order = this.state.professions.map(a => a.occupation);
                // for(var i =0;i< this.state.hourly_amount.length;i++){
                //         console.log(this.state.hourly_amount[i])
                // }
                // var user_profession = this.state.hourly_amount.map(value => console.log('VALUEE' + value));

                // var user_profession = Object.keys(this.state.hourly_amount);
                // var test = this.compare(this.state.professions, user_profession);
                // console.log('Testtt' + test);

                // var test = Object.keys(professions_order).sort(function(a,b){
                //     return console.log(a)
                // });
                // var test = Object.keys(professions_order).sort(function(a,b){
                //     return console.log(a)
                // });
                // var test = compare(this.state.professions.occupation, user_profession);
                // console.log('Testtt' + test);
            }
        });
    }

    compare(total_profession, user_profession) {
        if (total_profession.occupation.hasOwnProperty(user_profession)) {
            return 1;
        }
        if (!total_profession.occupation.hasOwnProperty(user_profession)) {
            return 1;
        }
        return 0;
    }

    professions_html = () =>
        this.state.professions.map((profession, index) => (
            <div
                key={
                    !profession.occupation
                        ? profession[0]
                        : profession.occupation
                }
            >
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={
                                    this.state.checkbox_professions[
                                        !profession.occupation
                                            ? profession[0]
                                            : profession.occupation
                                    ] || ""
                                }
                                onChange={this.handleChangeCheckbox(
                                    !profession.occupation
                                        ? profession[0]
                                        : profession.occupation
                                )}
                                value={
                                    !profession.occupation
                                        ? profession[0]
                                        : profession.occupation
                                }
                            />
                        }
                        label={
                            !profession.occupation
                                ? profession[0]
                                : profession.occupation
                        }
                    />
                    <Grid
                        item
                        xs={12}
                        md={3}
                        style={{
                            display: this.state.checkbox_professions[
                                !profession.occupation
                                    ? profession[0]
                                    : profession.occupationn
                            ]
                                ? "block"
                                : "none"
                        }}
                    >
                        <TextField
                            required
                            error={
                                this.state.errors_required.hourly_error[
                                    !profession.occupation
                                        ? profession[0]
                                        : profession.occupation
                                ]
                            }
                            margin="normal"
                            className={this.props.classes.textField}
                            id={
                                !profession.occupation
                                    ? profession[0]
                                    : profession.occupation
                            }
                            variant="outlined"
                            label={
                                "Hourly Rate " + !profession.occupation
                                    ? profession[0]
                                    : profession.occupation
                            }
                            value={
                                this.state.hourly_amount[
                                    !profession.occupation
                                        ? profession[0]
                                        : profession.occupation
                                ] || ""
                            }
                            onChange={this.handleHourlyInputChange}
                            type="number"
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
                </FormGroup>
            </div>
        ));

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
        formData.append("address", this.state.address);

        var a = new Array();
        var b = new Object();
        // a[0] = this.state.hourly_amount;
        b.job = this.state.hourly_amount;
        // b.push(this.state.hourly_amount);
        for (var key in this.state.hourly_amount) {
            a.push(key, this.state.hourly_amount[key]);

            // formData.append(key, this.state.hourly_amount[key]);
        }
        formData.append("hourly_amount", JSON.stringify(a));

        // formData.append("hourly_amount   ", JSON.stringify(this.state.hourly_amount));

        if (
            validateForm(this.state.errors) &&
            this.handleEmptyForm() &&
            this.handleEmptyHour()
        ) {
            axios
                .post("/api/updateProfile/" + token, formData)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    console.log("Settings Page" + error);
                });
        }
    }

    render() {
        const { errors, errors_required, hourly_amount } = this.state;
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
                            {errors.name ? (
                                <span className={classes.error}>
                                    {t("register.fullname_error")}
                                </span>
                            ) : (
                                ""
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

                            {errors.password ? (
                                <span className="error">
                                    {t("register.password_set")}
                                </span>
                            ) : (
                                ""
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
                            {errors.confirm_password ? (
                                <span className="error">
                                    {t("register.confirm_password_error")}
                                </span>
                            ) : (
                                ""
                            )}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                error={this.state.errors_required.address}
                                id="address"
                                label="Address"
                                name="address"
                                defaultValue={user.address}
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
                            {errors.cep ? (
                                <span className="error">
                                    {i18n.language == "pt-BR"
                                        ? t("register.postal_codeBR")
                                        : t("register.postal_codeCA")}
                                </span>
                            ) : (
                                ""
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
                                value={this.state.country ? this.state.country: ''}
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

                            {errors.phone_number ? (
                                <span className="error">
                                    {t("register.phone_number_error")}
                                </span>
                            ) : (
                                ""
                            )}
                        </Grid>
                        {user.mate ? 
                            <Grid item xs={12} md={6}>
                            <FormLabel component="legend" margin="normal">
                                What do you want to work with?
                            </FormLabel>
                            {this.professions_html()}
                            </Grid>: null
                        }
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
