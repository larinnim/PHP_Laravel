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
import axios from 'axios';

class AvailableTime extends React.Component {
    state = {
        open: false,
        weekly: {
            Monday: {
                standard_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                standard_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
                interval_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                interval_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
                },
            Tuesday: {
                standard_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                standard_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
                interval_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                interval_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
            },
            Wednesday: {
                standard_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                standard_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
                interval_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                interval_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
            },
            Thursday: {
                standard_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                standard_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
                interval_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                interval_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
            },
            Friday: {
                standard_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                standard_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
                interval_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                interval_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
            },
            Saturday: {
                standard_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                standard_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
                interval_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                interval_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
            },
            Sunday: {
                standard_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                standard_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
                interval_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                interval_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
            }
        }
    };
 
    handleAvailability(user_id){
        this.setState({ open: true });
        axios.get('/api/availability',{
            params: {
              vref: user_id
            }
          })
            .then(response => {
                console.log(response);
                let days = response.data.days;
                // let timezone = Moment(response.data.days.Monday.standard_start_time).tz(response.data.timezone);
                // console.log(timezone);
                let days_copy = Object.assign({}, this.state.weekly);
                var keys = Object.keys(days); 
                var specificDaysArr = {};
                var specificDaysObj = {};

                for(var i = 0; i < keys.length-7; i++) { 
                    let d_start = new Date();
                    let d_end = new Date();
                days_copy[keys[i]].standard_start_time = new Date(days[keys[i]].standard_start_time.date); 
                days_copy[keys[i]].standard_end_time= new Date(days[keys[i]].standard_end_time.date); 
                days_copy[keys[i]].interval_start_time  = new Date(days[keys[i]].interval_start_time.date); 
                days_copy[keys[i]].interval_end_time  = new Date(days[keys[i]].interval_end_time.date); 

                // this.setState({ weekly: days[key] });
                var key = (keys[i]) ; 
                console.log(days[key]) 
            }

            for(var i = 7; i < keys.length; i++){
                specificDaysArr['specific_start_date'] = new Date(days[keys[i]].standard_start_time.date); 
                specificDaysArr['specific_end_date'] = new Date(days[keys[i]].standard_end_time.date); 
                // specificDaysArr['date'].specific_interval_start_date = new Date(days[keys[i]].specific_interval_start_date); 
                // specificDaysArr['date'].specific_interval_end_date = new Date(days[keys[i]].specific_interval_end_date); 
                // specificDaysObj.push(specificDaysArr);
                specificDaysObj[new Date(days[keys[i]].standard_start_time.date).toLocaleDateString(navigator.language)] = specificDaysArr;
                specificDaysArr = [];
            }
                this.setState({ 
                    weekly: days_copy,
                    specificDays: specificDaysObj
                });
            })
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, user_id } = this.props;

        return (
            <div>
                <Button
                    onClick={() => this.handleAvailability(user_id)}
                    // onClick={this.handleAvailability}
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
