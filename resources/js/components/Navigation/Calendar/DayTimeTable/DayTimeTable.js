import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto",
        maxHeight: "500px",
        overflow: "auto"
    },
    table: {
        minWidth: 700
    },
    color: {
        backgroundColor: "blue"
    }
});

class DayTimeTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            todayDate: null,
            todayDay: null
        };
    }

    isActive = (indexTable, colorIndex) => {
        if (indexTable) {
            return colorIndex;
        } else {
            return null;
        }
    };
    cellClickHandler = (id, weekDay) => {
        let toUpdateRow = this.state.rows;
        console.log(toUpdateRow);
        switch (weekDay) {
            case "monday":
                toUpdateRow[id - 1].monday = !toUpdateRow[id - 1].monday;
                break;
            case "tuesday":
                toUpdateRow[id - 1].tuesday = !toUpdateRow[id - 1].tuesday;
                break;
            case "wednesday":
                toUpdateRow[id - 1].wednesday = !toUpdateRow[id - 1].wednesday;
                break;
            case "thursday":
                toUpdateRow[id - 1].thursday = !toUpdateRow[id - 1].thursday;
                break;
            case "friday":
                toUpdateRow[id - 1].friday = !toUpdateRow[id - 1].friday;
                break;
            case "saturday":
                toUpdateRow[id - 1].saturday = !toUpdateRow[id - 1].saturday;
                break;
            case "sunday":
                toUpdateRow[id - 1].sunday = !toUpdateRow[id - 1].sunday;
                break;
        }
        this.setState({ rows: toUpdateRow });
    };
    getHeaderText = todayDay => {
        let todayDayText = null;
        if (todayDay > 7) {
            todayDay = todayDay % 7;
        }
        switch (todayDay) {
            case 1:
                todayDayText = "Monday";
                break;
            case 2:
                todayDayText = "Tuesday";
                break;
            case 3:
                todayDayText = "Wednesday";
                break;
            case 4:
                todayDayText = "Thursday";
                break;
            case 5:
                console.log("inside case");
                todayDayText = "Friday";
                break;
            case 6:
                todayDayText = "Saturday";
                break;
            case 7:
                todayDayText = "Sunday";
                break;
        }
        return todayDayText;
    };

    componentDidMount() {
        let id = 0;
        var intervalMinutes = 30;
        var interval = moment.duration(intervalMinutes, "minutes");
        var min = moment("00:00", "HH:mm");
        var max = moment("23:30", "HH:mm");
        var timeSlots =
            1 + moment(max, "h:mma").diff(moment(min, "h:mma")) / interval;
        function createBaseData(step) {
            var current = moment(min).add(step * interval);
            return current;
        }
        function createData(
            time,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday
        ) {
            id += 1;
            return {
                id,
                time,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                sunday
            };
        }
        let initialRows = [];
        for (let i = 0; i < timeSlots; i++) {
            initialRows.push(
                createData(
                    createBaseData(i).format("hh:mm a"),
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false
                )
            );
        }
        let initialTodayDate = createBaseData(0).format("MM-DD-YYYY");
        let initialTodayDay = createBaseData(0).day(); //Monday = 1, ..., Sunday = 7
        this.setState({
            todayDate: initialTodayDate,
            rows: initialRows,
            todayDay: initialTodayDay
        });
    }

    render() {
        console.log(this.state.todayDay);
        const { classes } = this.props;
        let dayTimeTable = (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Time</TableCell>
                            <TableCell align="right">
                                {this.getHeaderText(this.state.todayDay)}
                            </TableCell>
                            <TableCell align="right">
                                {this.getHeaderText(this.state.todayDay + 1)}
                            </TableCell>
                            <TableCell align="right">
                                {this.getHeaderText(this.state.todayDay + 2)}
                            </TableCell>
                            <TableCell align="right">
                                {this.getHeaderText(this.state.todayDay + 3)}
                            </TableCell>
                            <TableCell align="right">
                                {this.getHeaderText(this.state.todayDay + 4)}
                            </TableCell>
                            <TableCell align="right">
                                {this.getHeaderText(this.state.todayDay + 5)}
                            </TableCell>
                            <TableCell align="right">
                                {this.getHeaderText(this.state.todayDay + 6)}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    <div>{row.time}</div>
                                </TableCell>
                                <TableCell
                                    className={this.isActive(
                                        row.monday,
                                        classes.color
                                    )}
                                    align="right"
                                    onClick={() =>
                                        this.cellClickHandler(row.id, "monday")
                                    }
                                />
                                <TableCell
                                    className={this.isActive(
                                        row.tuesday,
                                        classes.color
                                    )}
                                    align="right"
                                    onClick={() =>
                                        this.cellClickHandler(row.id, "tuesday")
                                    }
                                />
                                <TableCell
                                    className={this.isActive(
                                        row.wednesday,
                                        classes.color
                                    )}
                                    align="right"
                                    onClick={() =>
                                        this.cellClickHandler(
                                            row.id,
                                            "wednesday"
                                        )
                                    }
                                />
                                <TableCell
                                    className={this.isActive(
                                        row.thursday,
                                        classes.color
                                    )}
                                    align="right"
                                    onClick={() =>
                                        this.cellClickHandler(
                                            row.id,
                                            "thursday"
                                        )
                                    }
                                />
                                <TableCell
                                    className={this.isActive(
                                        row.friday,
                                        classes.color
                                    )}
                                    align="right"
                                    onClick={() =>
                                        this.cellClickHandler(row.id, "friday")
                                    }
                                />
                                <TableCell
                                    className={this.isActive(
                                        row.saturday,
                                        classes.color
                                    )}
                                    align="right"
                                    onClick={() =>
                                        this.cellClickHandler(
                                            row.id,
                                            "saturday"
                                        )
                                    }
                                />
                                <TableCell
                                    className={this.isActive(
                                        row.sunday,
                                        classes.color
                                    )}
                                    align="right"
                                    onClick={() =>
                                        this.cellClickHandler(row.id, "sunday")
                                    }
                                />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
        return <div>{dayTimeTable}</div>;
    }
}

DayTimeTable.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(DayTimeTable);
