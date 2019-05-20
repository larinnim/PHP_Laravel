import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";
import AddIcon from "@material-ui/icons/Add";
import Moment from "moment";
import MomentTimezone from "moment-timezone";
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

Moment.locale(navigator.language);
momentLocalizer();

// const  timezone = new Date().getTimezoneOffset();

const timezone =  MomentTimezone.tz.guess();

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
        openIntervalSpecifc: false,
        specificDays: {},
        availableSwitch: false,
        timeStatus: true,
        specific_start_date: new Date(new Date().setHours(0, 0, 0, 0)),
        specific_end_date: new Date(new Date().setHours(23, 0, 0, 0)),
        specific_interval_start_date: new Date(new Date().setHours(0, 0, 0, 0)),
        specific_interval_end_date: new Date(new Date().setHours(23, 0, 0, 0)),
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
        let current_specific_start_date = this.state.specific_start_date;
        let current_specific_end_date = this.state.specific_end_date;
        this.setState({
            timeStatus: !this.state.timeStatus,
            availableSwitch: !this.state.availableSwitch,
            specific_start_date: new Date(current_specific_start_date.setHours(0, 0, 0, 0)),
            specific_end_date: new Date(current_specific_end_date.setHours(0, 0, 0, 0))
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

    handleIntervalSpecific () {
        let openIntervalSpecifc = this.state.openIntervalSpecifc;
        openIntervalSpecifc = !openIntervalSpecifc;
        this.setState({ openIntervalSpecifc:  openIntervalSpecifc});
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handlePickerStart = name => event => {
        this.setState({ specific_start_date: event });
    };

    handlePickerEnd = name => event => {
        this.setState({ specific_end_date: event });
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

    handleIntervalSpecificStart = name => event => {
        console.log(name);
        console.log(event);
        this.setState({ specific_interval_start_date: new Date(event)}); 
    }

    handleIntervalSpecificEnd = name => event => {
        this.setState({ specific_interval_end_date:  new Date(event) }); 
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

   saveSpecific = () => {

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("specific_start_date", this.state.specific_start_date.toISOString());
    formData.append("specific_end_date", this.state.specific_end_date.toISOString());
    // formData.append("specific_interval_start_date", this.state.specific_interval_start_date.toISOString());
    // formData.append("specific_interval_end_date", this.state.specific_interval_end_date.toISOString());
    formData.append("timezone", timezone);
    axios
            .post("/api/availability/specific/" + token, formData)
            .then(response => {
                return response;
            })
            .catch(error => {
                console.log(error);
            });
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
                                                step={60}
                                                defaultValue={this.state.specific_start_date}
                                                // defaultValue={new Date()}
                                                onChange={this.handlePickerStart()}
                                                time={timeStatus}
                                                min={this.state.specific_start_date}
                                                // min={new Date()}
                                            />
                                        </div>
                                        <Button onClick={() => this.handleIntervalSpecific()}><AddIcon/> Add Interval</Button>
                                        { this.state.openIntervalSpecifc ?
                                            <div style={{ backgroundColor: 'grey' }}>
                                                <div>
                                                    Start
                                                    <DateTimePicker
                                                        defaultValue={this.state.specific_interval_start_date}
                                                        onChange={this.handleIntervalSpecificStart()}
                                                        step={60}
                                                        // date={false}
                                                        min={this.state.specific_start_date}
                                                        max={this.state.specific_end_date}
                                                        time={timeStatus}
                                                    />
                                                </div>

                                                <div style={{ marginTop: 40 }}>
                                                    End
                                                    <DateTimePicker
                                                        defaultValue={this.state.specific_interval_end_date}
                                                        onChange={this.handleIntervalSpecificEnd()}
                                                        step={60}
                                                        // date={false}
                                                        min={this.state.specific_start_date}
                                                        max={this.state.specific_end_date}
                                                        time={timeStatus}
                                                    />
                                                </div>
                                            </div>
                                        : ''
                                    }
                                        <div style={{ marginTop: 40 }}>
                                            End
                                            <DateTimePicker
                                                step={60}
                                                // defaultValue={new Date()}
                                                defaultValue={this.state.specific_end_date}
                                                onChange={this.handlePickerEnd()}
                                                min={this.state.specific_start_date}
                                                // min={new Date()}
                                                time={timeStatus}
                                            />
                                        </div>
                                        <Button size="small" onClick={this.saveSpecific}>
                                            Save
                                        </Button>
                        </TabContainer>
                        </SwipeableViews>
                    </div>
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
