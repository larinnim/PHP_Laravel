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

var locale = window.navigator.userLanguage || window.navigator.language;
const styles = theme => ({
    root: {
        width: "auto",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto",
        maxHeight: "500px",
        maxWidth: "100%",
        overflow: "auto",
        textAlign: "center !important",
        margin: "auto", //this will center the paper,
        marginBottom: theme.spacing.unit * 3
    },
    table: {
        // minWidth: 700
    },
    color: {
        backgroundColor: "blue"
    },
    cellsStyle: {
        borderRight: "1px solid grey",
        padding: 0,
        textAlign: "center"
    },
    cellsHeaderStyle: {
        borderRight: "1px solid grey",
        borderBottom: "1px solid grey",
        padding: 0,
        textAlign: "center",
        backgroundColor: "#ccc",
        color: "#555",
        fontFamily: "Roboto"
    }
});

class DayTimeTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            todayDate: null,
            todayDay: null,
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
        switch (weekDay) {
            case "day1":
                toUpdateRow[id - 1].day1 = !toUpdateRow[id - 1].day1;
                break;
            case "day2":
                toUpdateRow[id - 1].day2 = !toUpdateRow[id - 1].day2;
                break;
            case "day3":
                toUpdateRow[id - 1].day3 = !toUpdateRow[id - 1].day3;
                break;
            case "day4":
                toUpdateRow[id - 1].day4 = !toUpdateRow[id - 1].day4;
                break;
            case "day5":
                toUpdateRow[id - 1].day5 = !toUpdateRow[id - 1].day5;
                break;
            case "day6":
                toUpdateRow[id - 1].day6 = !toUpdateRow[id - 1].day6;
                break;
            case "day7":
                toUpdateRow[id - 1].day7 = !toUpdateRow[id - 1].day7;
                break;
        }
        this.setState({ rows: toUpdateRow });
    };
    // getHeaderText = todayDay => {
    //     let todayDayText = null;
    //     console.log(todayDay);
    //     if (todayDay > 7) {
    //         todayDay = todayDay % 7;
    //     }
    //     switch (todayDay) {
    //         case 1:
    //             // todayDayText = "Mon";
    //             todayDayText = moment().locale(locale).format('ddd') + ' - ' +moment().locale(locale).format('D MMMM');
    //             break;
    //         case 2:
    //             todayDayText = "Tue";
    //             break;
    //         case 3:
    //             todayDayText = "Wed";
    //             break;
    //         case 4:
    //             todayDayText = "Thu";
    //             break;
    //         case 5:
    //             todayDayText = "Fri";
    //             break;
    //         case 6:
    //             todayDayText = "Sat";
    //             break;
    //         default:
    //             todayDayText = "Sun";
    //             break;
    //     }
    //     return todayDayText;
    // };

    header_table_html = (props) => {
        var indents = [];
        let i = this.props.week_index;
        let final_week = i+7;
        while(i < final_week){
            indents.push(
              <TableCell className={this.props.classes.cellsHeaderStyle} key={i}>
                {moment().locale(locale).add(i, 'days').format('ddd') + ' - ' +moment().locale(locale).add(i, 'days').format('D MMMM')}
            </TableCell>
            );
            i++;
        }

        return indents;

        // return (arr.map((value, i)  => {
        //     <TableCell className={this.props.classes.cellsHeaderStyle}>
        //         {moment().locale(locale).add(i, 'days').format('ddd') + ' - ' +moment().locale(locale).add(i, 'days').format('D MMMM')}
        //     </TableCell>
        // }));
    };

    componentDidMount() {
        let id = 0;
        var intervalMinutes = 60;
        var interval = moment.duration(intervalMinutes, "minutes");
        var min = moment("00:00", "HH:mm");
        var max = moment("23:00", "HH:mm");
        var timeSlots =
            1 + moment(max, "h:mma").diff(moment(min, "h:mma")) / interval;
        function createBaseData(step) {
            var current = moment(min).add(step * interval);
            return current;
        }
        function createData(time, day1, day2, day3, day4, day5, day6, day7) {
            id += 1;
            return {
                id,
                time,
                day1,
                day2,
                day3,
                day4,
                day5,
                day6,
                day7
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
        let initialTodayDay = createBaseData(0).day(); //Monday = 1, ..., Sunday = 0
        this.setState({
            todayDate: initialTodayDate,
            rows: initialRows,
            todayDay: initialTodayDay
        });
    }

    render() {
        const { classes } = this.props;
        let dayTimeTable = (
            <Paper className={classes.root} style={{ textAlign: "center" }}>
                <Table
                    className={classes.table}
                    style={{ tableLayout: "fixed" }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cellsHeaderStyle}>
                                Time
                            </TableCell>
                            {this.header_table_html()}

                            {/* <TableCell className={classes.cellsHeaderStyle}>
                                {this.getHeaderText(this.state.todayDay)}
                            </TableCell>
                            <TableCell className={classes.cellsHeaderStyle}>
                                {this.getHeaderText(this.state.todayDay + 1)}
                            </TableCell>
                            <TableCell className={classes.cellsHeaderStyle}>
                                {this.getHeaderText(this.state.todayDay + 2)}
                            </TableCell>
                            <TableCell className={classes.cellsHeaderStyle}>
                                {this.getHeaderText(this.state.todayDay + 3)}
                            </TableCell>
                            <TableCell className={classes.cellsHeaderStyle}>
                                {this.getHeaderText(this.state.todayDay + 4)}
                            </TableCell>
                            <TableCell className={classes.cellsHeaderStyle}>
                                {this.getHeaderText(this.state.todayDay + 5)}
                            </TableCell>
                            <TableCell
                                className={classes.cellsHeaderStyle}
                                style={{ paddingRight: 0 }}
                            >
                                {this.getHeaderText(this.state.todayDay + 6)}
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell
                                    className={classes.cellsHeaderStyle}
                                    component="th"
                                    scope="row"
                                >
                                    <div>{row.time}</div>
                                </TableCell>
                                <TableCell
                                    className={`${this.isActive(
                                        row.day1,
                                        classes.color
                                    )} ${classes.cellsStyle}`}
                                    align="right"
                                    onClick={() =>
                                        this.cellClickHandler(row.id, "day1")
                                    }
                                />
                                <TableCell
                                    className={`${this.isActive(
                                        row.day2,
                                        classes.color
                                    )} ${classes.cellsStyle}`}
                                    align="right"
                                    onClick={() =>
                                        this.cellClickHandler(row.id, "day2")
                                    }
                                />
                                <TableCell
                                    className={`${this.isActive(
                                        row.day3,
                                        classes.color
                                    )} ${classes.cellsStyle}`}
                                    align="right"
                                    onClick={() =>
                                        this.cellClickHandler(row.id, "day3")
                                    }
                                />
                                <TableCell
                                    className={`${this.isActive(
                                        row.day4,
                                        classes.color
                                    )} ${classes.cellsStyle}`}
                                    align="right"
                                    onClick={() =>
                                        this.cellClickHandler(row.id, "day4")
                                    }
                                />
                                <TableCell
                                    className={`${this.isActive(
                                        row.day5,
                                        classes.color
                                    )} ${classes.cellsStyle}`}
                                    align="right"
                                    onClick={() =>
                                        this.cellClickHandler(row.id, "day5")
                                    }
                                />
                                <TableCell
                                    className={`${this.isActive(
                                        row.day6,
                                        classes.color
                                    )} ${classes.cellsStyle}`}
                                    align="right"
                                    onClick={() =>
                                        this.cellClickHandler(row.id, "day6")
                                    }
                                />
                                <TableCell
                                    className={`${this.isActive(
                                        row.day7,
                                        classes.color
                                    )} ${classes.cellsStyle}`}
                                    align="right"
                                    onClick={() =>
                                        this.cellClickHandler(row.id, "day7")
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
