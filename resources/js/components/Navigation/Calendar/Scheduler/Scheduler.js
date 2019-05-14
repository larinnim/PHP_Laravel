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

const  timezone = new Date().getTimezoneOffset();
// Date.prototype.stdTimezoneOffset = function () {
//     var jan = new Date(this.getFullYear(), 0, 1);
//     var jul = new Date(this.getFullYear(), 6, 1);
//     return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
// }

// Date.prototype.isDstObserved = function () {
//     return this.getTimezoneOffset() < this.stdTimezoneOffset();
// }

// var today = new Date();
// if (today.isDstObserved()) { 
//     alert ("Daylight saving time!");
// }

// alert(Date.prototype.stdTimezoneOffset);
// alert(Date.prototype.isDstObserved);

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

class SimpleModal extends React.Component {
    state = {
        open: false,
        openInterval: {
            Monday: false,
            Tuesday: false,
            Wednesday: false,
            Thursday: false,
            Friday: false,
            Saturday: false,
            Sunday: false,
        },
        availableSwitch: false,
        timeStatus: true,
        startDateTime: new Date(),
        endDateTime: "",
        value: 0,
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

    handleInterval (day) {
        let openInterval = this.state.openInterval;
        openInterval[day] = !openInterval[day];
        this.setState({ openInterval:  openInterval});
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

    handleWeeklyStart = name => event => {
        var var_weekly = this.state.weekly;
        var_weekly[name].standard_start_time = new Date(event);
        this.setState({ weekly: var_weekly });       
    };

    handleWeeklyEnd = name => event => {
        var var_weekly = this.state.weekly;
        var_weekly[name].standard_end_time =new Date(event);
        this.setState({ weekly: var_weekly }); 
    }; 

    handleIntervalStart = name => event => {
        console.log(name);
        console.log(event);
        var var_weekly = this.state.weekly;
        var_weekly[name].interval_start_time = new Date(event);
        this.setState({ weekly: var_weekly }); 
    }

    handleIntervalEnd = name => event => {
        var var_weekly = this.state.weekly;
        var_weekly[name].interval_end_time = new Date(event);
        this.setState({ weekly: var_weekly }); 
    }

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
                    defaultValue={this.state.weekly[day].standard_start_time}
                />
            </div>
            <div>
                End
                <DateTimePicker
                    date={false}
                    step={60}
                    onChange={this.handleWeeklyEnd(day.toString())}
                    defaultValue={this.state.weekly[day].standard_end_time}
                    min={this.state.weekly[day].standard_start_time}
                />
            </div>
            <Button onClick={() => this.handleInterval(day)} value={day}><AddIcon/> Add Interval</Button>
            { this.state.openInterval[day] ?
                    <div style={{ backgroundColor: 'grey' }}>
                        <div>
                            Start
                            <DateTimePicker
                                defaultValue={this.state.weekly[day].interval_start_time}
                                onChange={this.handleIntervalStart(day.toString())}
                                step={60}
                                date={false}
                                min={this.state.weekly[day].standard_start_time}
                                max={this.state.weekly[day].standard_end_time}
                            />
                        </div>

                        <div style={{ marginTop: 40 }}>
                            End
                            <DateTimePicker
                                defaultValue={this.state.weekly[day].interval_end_time}
                                onChange={this.handleIntervalEnd(day.toString())}
                                step={60}
                                date={false}
                                min={this.state.weekly[day].standard_start_time}
                                max={this.state.weekly[day].standard_end_time}
                            />
                        </div>
                    </div>
                : ''
            }
            
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
        formData.append("timezone", timezone);

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
            let timezone = Moment(response.data.days.Monday.standard_start_time).tz(response.data.timezone).format();
            // let timezone = Moment(response.data.days.Monday.standard_start_time).tz(response.data.timezone);
            console.log(timezone);
            let days_copy = Object.assign({}, this.state.weekly);
            var keys = Object.keys(days); 

            for(var i = 0; i < keys.length; i++) { 
                 let d_start = new Date();
                 let d_end = new Date();

                d_start.setHours(parseInt(days[keys[i]].standard_start_time));
                d_start.setMinutes(0);
                d_start.setSeconds(0); 
                d_end.setHours(parseInt(days[keys[i]].end_time));
                d_end.setMinutes(0);
                d_end.setSeconds(0); 
                days_copy[keys[i]].standard_start_time = d_start; 
                days_copy[keys[i]].standard_end_time= d_end; 
                days_copy[keys[i]].interval_start_time  = d_start; 
                days_copy[keys[i]].interval_end_time  = d_end; 

                // this.setState({ weekly: days[key] });
                var key = (keys[i]) ; 
                console.log(days[key]) 
            }
            this.setState({ weekly: days_copy});

            // Object.keys(days).forEach(function(value, key) {
            //     console.log(value+key);
            // });
            // Object.keys(days).map((week_day, i) => {  
                // let d = new Date();
                // d.setHours(parseInt(days.Friday.start_date));
                // d.setMinutes(0);
                // d.setSeconds(0);   
            //     console.log(week_day + i + week_day[i]);
            //  })
           

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
