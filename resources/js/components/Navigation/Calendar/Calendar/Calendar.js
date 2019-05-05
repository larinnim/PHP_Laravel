import React from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import Scheduler from "../Scheduler/Scheduler";
import { DateTimePicker } from "react-widgets";
import "react-day-picker/lib/style.css";
import Agenda from "../Agenda/Agenda";
import styles from "./Calendar_Style";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Test from "./Calendar_Style";
import "./Calendar.css";
import DayTimeTable from "../DayTimeTable/DayTimeTable";
const MONTHS = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre"
];
const WEEKDAYS_LONG = [
    "Domenica",
    "Lunedì",
    "Martedì",
    "Mercoledì",
    "Giovedì",
    "Venerdì",
    "Sabato"
];
const WEEKDAYS_SHORT = ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa"];

const modifiers = {
    highlighted: [new Date(2019, 4, 20), new Date(2019, 4, 25)]
};
// const highlighted = {
//   from: new Date(),
//   to: new Date(),
// }

const birthdayStyle = `.DayPicker-Day--highlighted {
  background-color: orange;
  color: white;
}`;

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.state = {
            selectedDays: [],
            // modalDates: {  **** DONT DELETE PUT THIS WHEN CONTRACT WITH USER ***
            //   highlighted: []
            // },
            disabledDays: []
        };
    }

    getDatesfromChild = value => {
        console.log("Child Data");
        console.log(value);
        this.setState({ disabledDays: value });
        // this.setState({ modalDates: { **** DONT DELETEEE
        //   highlighted: value
        // }});
    };

    handleDayClick(day, { selected }) {
        const { selectedDays } = this.state;
        if (selected) {
            const selectedIndex = selectedDays.findIndex(selectedDay =>
                DateUtils.isSameDay(selectedDay, day)
            );
            selectedDays.splice(selectedIndex, 1);
        } else {
            selectedDays.push(day);
        }

        this.setState({ selectedDays });
    }
    trasformDateToString = dataToTransform => {
        let day = dataToTransform.getDate();
        let month = dataToTransform.getMonth();
        let year = dataToTransform.getFullYear();
        return day + "-" + (month + 1) + "-" + year;
    };
    trasformTimeToString = dataToTransform => {
        let hour = dataToTransform.getHours();
        let minute = dataToTransform.getMinutes();
        let second = dataToTransform.getSeconds();
        return hour + "-" + minute + "-" + second;
    };
    render() {
        const { classes } = this.props;
        let dataFromScheduler = null;
        if (this.disabledDays) {
            dataFromScheduler = (
                <div>
                    {this.state.disabledDays.map(timeStamp => (
                        <Agenda
                            key={timeStamp}
                            Date={this.trasformDateToString(timeStamp)}
                            Time={this.trasformTimeToString(timeStamp)}
                        />
                    ))}
                </div>
            );
        }
        return (
            <div>
                <div className={classes.grids}>
                    <div className={classes.root}>
                        <Grid container spacing={40}>
                            <Grid
                                item
                                xs={12}
                                className={classes.alignCalendar}
                            >
                                <DayPicker
                                    locale="pt-BR"
                                    selectedDays={this.state.selectedDays}
                                    onDayClick={this.handleDayClick}
                                    months={MONTHS}
                                    weekdaysLong={WEEKDAYS_LONG}
                                    weekdaysShort={WEEKDAYS_SHORT}
                                    firstDayOfWeek={1}
                                    disabledDays={this.state.disabledDays}
                                    // disabledDays={this.state.modalDates}
                                    // modifiers={this.state.modalDates}
                                    // modifiers={modifiers}
                                />
                                <Scheduler getDate={this.getDatesfromChild} />
                            </Grid>
                            {/*---DO NOT DELETE: THIS WILL BE USED FOR THE ALLY'S AGENDA---*/}
                            {/* <Grid item xs={12} sm={6}>
                                <div className="ScrollableContainer">
                                    {this.state.disabledDays.map(timeStamp => (
                                        <Agenda
                                            key={timeStamp}
                                            Date={this.trasformDateToString(
                                                timeStamp
                                            )}
                                            Time={this.trasformTimeToString(
                                                timeStamp
                                            )}
                                        />
                                    ))}
                                </div>
                            </Grid> */}
                            <Grid item xs={12}>
                                <DayTimeTable />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
}

Calendar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Calendar);
