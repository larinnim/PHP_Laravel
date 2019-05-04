import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import "react-widgets/dist/css/react-widgets.css";
import "./Scheduler.css";
import styles from "./Scheduler_Style";

Moment.locale("pt-BR");
momentLocalizer();

function rand() {
    return Math.round(Math.random() * 20) - 33;
}

function getModalStyle() {
    const top = 9;
    const left = 9;

    // const top = 50 + rand();
    // const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

class SimpleModal extends React.Component {
    state = {
        open: false,
        availableSwitch: false,
        timeStatus: true,
        startDateTime: new Date(),
        endDateTime: ""
    };

    handleSwitch = name => event => {
        this.setState({
            timeStatus: !this.state.timeStatus,
            availableSwitch: !this.state.availableSwitch
        });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handlePickerStart = name => event => {
        this.setState({ startDateTime: event });
    };

    handlePickerEnd = name => event => {
        this.setState({ endDateTime: event });
    };

    handleTimeSlot = () => {
        const arrayDates = [];
        arrayDates.push(Moment(new Date(this.state.startDateTime))._d);
        if (
            !this.state.endDateTime ||
            this.state.endDateTime == this.state.startDateTime
        ) {
            this.props.getDate(arrayDates);
        } else {
            const diffHours = Moment(this.state.endDateTime).diff(
                Moment(this.state.startDateTime),
                "hours"
            );
            const remainder = (diffHours % 24) / 100;
            const days_slot = Moment(this.state.endDateTime).diff(
                Moment(this.state.startDateTime),
                "days"
            );

            // if(remainder == 0){
            console.log("E MULTIPLOO");
            for (var i = 1; i <= days_slot; i++) {
                arrayDates.push(
                    Moment(new Date(this.state.startDateTime)).add(i, "d")._d
                );
            }
            // }

            console.log(days_slot);
            console.log(
                Moment(this.state.endDateTime).diff(
                    Moment(this.state.startDateTime),
                    "hours"
                )
            );

            this.props.getDate(arrayDates);
        }
    };

    render() {
        const { classes } = this.props;
        const { timeStatus, minEndDate, dates } = this.state;

        return (
            <div>
                <Button onClick={this.handleOpen}>
                    <AddCircleIcon />
                </Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div
                        className={`${classes.paper} ${
                            classes.centerScheduler
                        }`}
                    >
                        <Typography variant="h6" id="modal-title">
                            Set Unavailable Dates and Times
                        </Typography>
                        <FormControlLabel
                            control={
                                <Switch
                                    classes={{
                                        switchBase: classes.iOSSwitchBase,
                                        bar: classes.iOSBar,
                                        icon: classes.iOSIcon,
                                        iconChecked: classes.iOSIconChecked,
                                        checked: classes.iOSChecked
                                    }}
                                    disableRipple
                                    checked={this.state.availableSwitch}
                                    onChange={this.handleSwitch(
                                        "availableSwitch"
                                    )}
                                    value="availableSwitch"
                                />
                            }
                            label="All Day"
                        />
                        <div>
                            Start
                            <DateTimePicker
                                defaultValue={new Date()}
                                onChange={this.handlePickerStart()}
                                time={timeStatus}
                                min={new Date()}
                            />
                        </div>

                        <div style={{ marginTop: 40 }}>
                            End
                            <DateTimePicker
                                defaultValue={new Date()}
                                onChange={this.handlePickerEnd()}
                                min={new Date()}
                                time={timeStatus}
                            />
                        </div>
                        <Button size="small" onClick={this.handleTimeSlot}>
                            Save
                        </Button>
                    </div>
                </Modal>
            </div>
        );
    }
}

SimpleModal.propTypes = {
    classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
