import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NoSsr from "@material-ui/core/NoSsr";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import axios from "axios";
import styles from "./Autocomplete_Style";

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps
                }
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography
            className={props.selectProps.classes.singleValue}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return (
        <div className={props.selectProps.classes.valueContainer}>
            {props.children}
        </div>
    );
}

function Menu(props) {
    return (
        <Paper
            square
            className={props.selectProps.classes.paper}
            {...props.innerProps}
        >
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer
};

class Autocomplete extends Component {
    _isMounted = false;
    state = {
        single: null,
        suggestions: [],
        results: []
    };

    handleChange = name => value => {
        this.setState({
            [name]: value
        });
    };

    handleSearch() {
        let url =
            "/api/occupations/agents?q=" + encodeURI(this.state.single.value);
        axios
            .get(url)
            .then(response => {
                if (this._isMounted) {
                    response.data.length > 0
                        ? (window.location =
                              "/agents_occupations?q=" +
                              encodeURI(this.state.single.value))
                        : "";
                }
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this._isMounted = true;

        axios.get("/api/occupations").then(response => {
            if (this._isMounted) {
                this.setState({
                    suggestions: response.data.map(suggestion => ({
                        value: suggestion.occupation,
                        label: suggestion.occupation
                    }))
                });
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { classes, theme } = this.props;

        const selectStyles = {
            input: input => ({
                ...input,
                color: "black"
            }),
            placeholder: style => ({ ...style, color: "back" }),
            control: (style, state) => ({
                ...style,
                "&:hover": { borderColor: "orange" }, // border style on hover
                border: "1px solid lightgray", // default border color
                boxShadow: "orange"
            }),
            option: (style, state) => ({
                ...style,
                backgroundColor: state.isSelected ? "grey" : "white",
                "&:hover": {
                    color: "black",
                    backgroundColor: "orange"
                }
            })
        };
        return (
            <div className={classes.root}>
                <NoSsr>
                    <Select
                        classes={classes}
                        styles={selectStyles}
                        options={this.state.suggestions}
                        // components={components}
                        value={this.state.single}
                        onChange={this.handleChange("single")}
                        placeholder="What are you looking for?"
                        isClearable
                    />
                    <div className={classes.divider} />
                </NoSsr>
                <Button
                    onClick={() => this.handleSearch()}
                    variant="contained"
                    classes={{ root: classes.button }}
                >
                    Search
                </Button>
            </div>
        );
    }
}

Autocomplete.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Autocomplete);
