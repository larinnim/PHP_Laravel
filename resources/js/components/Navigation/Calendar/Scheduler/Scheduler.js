import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";
import AddIcon from "@material-ui/icons/Add";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import "react-widgets/dist/css/react-widgets.css";
import "./Scheduler.css";
import styles from "./Scheduler_Style";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import SaveIcon from '@material-ui/icons/Save';
import axios from "axios";

Moment.locale("pt-BR");
momentLocalizer();

function TabContainer({ children, dir }) {
    return (
      <Typography component="div" dir={dir} style={{ padding: 8 * 3, backgroundColor:"white", height:"650px", overflow:"auto"}}>
        {children}
      </Typography>
    );
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
  };

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
        endDateTime: "",
        value: 0,
        weekly: {
            Monday: {
                start_time: Moment().hour(0).minute(0),
                end_time: Moment(),
                interval: '',
            },
            Tuesday: {
                start_time: Moment().hour(0).minute(0),
                end_time: Moment(),
                interval: '',
            },
            Wednesday: {
                start_time: Moment().hour(0).minute(0),
                end_time: Moment(),
                interval: '',
            },
            Thursday: {
                start_time: Moment().hour(0).minute(0),
                end_time: Moment(),
                interval: '',
            },
            Friday: {
                start_time: Moment().hour(0).minute(0),
                end_time: Moment(),
                interval: '',
            },
            Saturday: {
                start_time: Moment().hour(0).minute(0),
                end_time: Moment(),
                interval: '',
            },
            Sunday: {
                start_time: Moment().hour(0).minute(0),
                end_time: Moment(),
                interval: '',
            }

        },
        week_days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    };
    
    handleChangeTabs = (event, value) => {
        this.setState({ value });
      };

      handleChangeIndex = index => {
        this.setState({ value: index });
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

    // handleWeeklyStart = (value, event, index) => {
    //     console.log(name);
    //     console.log(event);
    //     console.log(index);

    // };

    handleWeeklyStart = name => event => {
        console.log(name);
        console.log(event);
        var timezone = new Date(event);
        var offsetInHours = timezone.getTimezoneOffset() / 60;
        console.log(offsetInHours);
        console.log(Moment(event).format("hh:mm:ss a"));
        var var_weekly = this.state.weekly;
        var_weekly[name].start_time = Moment(event).hour();
        this.setState({ weekly: var_weekly });       
    };

    handleWeeklyEnd = name => event => {
        console.log(name);
        console.log(event);
        var timezone = new Date(event);
        var offsetInHours = timezone.getTimezoneOffset() / 60;
        var var_weekly = this.state.weekly;
        var_weekly[name].end_time = Moment(event).hour();
        this.setState({ weekly: var_weekly }); 
    }; 

    weekDays_html = () => 
    this.state.week_days.map((day) => (
        <div key={day.toString()}  style={{ marginBottom: 20 }} data-key={day.toString()}>
            <Typography variant="h6" id="modal-title">
                {day}
            </Typography>
            <div>
                Start
                <DateTimePicker
                    step={60}
                    date={false}
                    onChange={this.handleWeeklyStart(day.toString())}
                    defaultValue={new Date()}

                    // time={this.state.timeStatus}
                />
            </div>
            <div>
                End
                <DateTimePicker
                    date={false}
                    step={60}
                    onChange={this.handleWeeklyEnd(day.toString())}
                    min={Moment().hour(this.state.weekly[day].start_time+1).startOf('hour').toDate()}
                    defaultValue={new Date()}

                />
            </div>
            <span><AddIcon/> Add Interval</span>
    </div>
   ))

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
           
            for (var i = 1; i <= days_slot; i++) {
                arrayDates.push(
                    Moment(new Date(this.state.startDateTime)).add(i, "d")._d
                );
            }
            // }

         

            this.props.getDate(arrayDates);
        }
    };

    saveWeekly = () => {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("weekly", JSON.stringify(this.state.weekly));
        axios
                .post("/api/availability/" + token, formData)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    console.log(error);
                });
    };

    componentDidMount() {
        const token = localStorage.getItem("token");
        axios.get('/api/availability/' + token)
          .then(response => {
            console.log(response);
            let days = response.data.days;
            let d = new Date();
            d.setHours(parseInt(days.Friday.start_date));
            d.setMinutes(0);
            d.setSeconds(0);
            // console.log(d.setHours(parseInt(days.Friday.start_date)));
            // console.log(days.Friday.start_date)
            console.log(response);
          })
      }

    render() {
        const { classes, theme } = this.props;
        const { timeStatus, minEndDate, dates, value } = this.state;

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
                    <div>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChangeTabs}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                            >
                                <Tab label="Standard Weekly Schedule" />
                                <Tab label="Special Schedule" />
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                        >
                        <TabContainer dir={theme.direction}>
                            {this.weekDays_html()}
                            <Button size="small" onClick={this.saveWeekly}>
                            <SaveIcon />
                                Save
                            </Button>
                        </TabContainer>
                        <TabContainer dir={theme.direction}>
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
                        </TabContainer>
                        </SwipeableViews>
                    </div>
               
                    {/* <div
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
                    </div> */}
                </Modal>
            </div>
        );
    }
}

SimpleModal.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,

};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles, { withTheme: true })(SimpleModal);

export default SimpleModalWrapped;
