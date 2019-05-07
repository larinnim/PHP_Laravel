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
import styles from "./AvailableTime_Style";
import DayTimeTable from "../../../components/Navigation/Calendar/DayTimeTable/DayTimeTable";

class AvailableTime extends React.Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button
                    onClick={this.handleOpen}
                    variant="contained"
                    size="small"
                    classes={{ root: classes.button }}
                >
                    Check Availability
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
                            Select dates
                        </Typography>
                        <DayTimeTable />
                        <Button
                            size="medium"
                            onClick={this.handleTimeSlot}
                            classes={{ root: classes.button }}
                        >
                            Checkout
                        </Button>
                    </div>
                </Modal>
            </div>
        );
    }
}

AvailableTime.propTypes = {
    classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const AvailableTimeWrapped = withStyles(styles)(AvailableTime);

export default AvailableTimeWrapped;
