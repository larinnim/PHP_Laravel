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
import Checkbox from '@material-ui/core/Checkbox';

var locale = window.navigator.userLanguage || window.navigator.language;
var day_headers = [];

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
    initial_cell_color: {
        backgroundColor: "lightgreen"
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
            days_headers: [],
            selected_time: [],
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
        let header = this.state.days_headers;
        let selected_time_var = this.state.selected_time;
        let day= '';
        let time_var='';

        switch (weekDay) {
            case "day1":
                day = header[0].startOf('day');
                time_var = moment(toUpdateRow[id-1].time, 'HH:mm');
                day.set({
                    hour:   time_var.get('hour'),
                    minute: time_var.get('minute'),
                    second: time_var.get('second')
                });
                selected_time_var.push(day);
                break;
            case "day2":
                day = header[1].startOf('day');
                time_var = moment(toUpdateRow[id-1].time, 'HH:mm');
                day.set({
                    hour:   time_var.get('hour'),
                    minute: time_var.get('minute'),
                    second: time_var.get('second')
                });
                selected_time_var.push(day);
                // toUpdateRow[id - 1].day2 = !toUpdateRow[id - 1].day2;
                break;
            case "day3":
            day = header[2].startOf('day');
                time_var = moment(toUpdateRow[id-1].time, 'HH:mm');
                day.set({
                    hour:   time_var.get('hour'),
                    minute: time_var.get('minute'),
                    second: time_var.get('second')
                });
                selected_time_var.push(day);
                // toUpdateRow[id - 1].day3 = !toUpdateRow[id - 1].day3;
                break;
            case "day4":
                day = header[3].startOf('day');
                time_var = moment(toUpdateRow[id-1].time, 'HH:mm');
                day.set({
                    hour:   time_var.get('hour'),
                    minute: time_var.get('minute'),
                    second: time_var.get('second')
                });
                selected_time_var.push(day);
                // toUpdateRow[id - 1].day4 = !toUpdateRow[id - 1].day4;
                break;
            case "day5":
                day = header[4].startOf('day');
                time_var = moment(toUpdateRow[id-1].time, 'HH:mm');
                day.set({
                    hour:   time_var.get('hour'),
                    minute: time_var.get('minute'),
                    second: time_var.get('second')
                });
                selected_time_var.push(day);
                // toUpdateRow[id - 1].day5 = !toUpdateRow[id - 1].day5;
                break;
            case "day6":
            day = header[6].startOf('day');
                time_var = moment(toUpdateRow[id-1].time, 'HH:mm');
                day.set({
                    hour:   time_var.get('hour'),
                    minute: time_var.get('minute'),
                    second: time_var.get('second')
                });
                selected_time_var.push(day);
                // toUpdateRow[id - 1].day6 = !toUpdateRow[id - 1].day6;
                break;
            case "day7":
            day = header[7].startOf('day');
                time_var = moment(toUpdateRow[id-1].time, 'HH:mm');
                day.set({
                    hour:   time_var.get('hour'),
                    minute: time_var.get('minute'),
                    second: time_var.get('second')
                });
                selected_time_var.push(day);
                // toUpdateRow[id - 1].day7 = !toUpdateRow[id - 1].day7;
                break;
        }
        this.setState({ rows: toUpdateRow });
    };
    
    fill_table_rows = (day_headers, rows) => {
        console.log('DAYS HEADER: '+ day_headers);
        var toPopulateRow = rows;

        // day_headers.map((value, header_index)  => {
        for (let index = 1; index <= day_headers.length; ++index) {
            if(this.props.specificDays.length > 0){
                // var existe_day = this.isInArray(this.getOnlyDate(this.props.specificDays), moment(value).startOf('day'));
                var existe_day = this.isInArray(this.getOnlyDate(this.props.specificDays), moment(day_headers[index-1]).startOf('day'));
                if(existe_day){
                     console.log('exist specific day');
                }
            }
            else {
            //    var day_of_week = moment(value).locale('en').format('dddd');
            //    console.log('VALUE ' +moment(value).locale('en').format('dddd'));
            var day_of_week = moment(day_headers[index-1]).locale('en').format('dddd');
            console.log('VALUE ' +moment(day_headers[index-1]).locale('en').format('dddd'));
               var weeklyObj = this.props.weekly[day_of_week];
               var duration = moment.duration(moment(weeklyObj.standard_end_time).diff(moment(weeklyObj.standard_start_time)));
               var hours = duration.asHours();
                console.log('DIF HOURS '+ hours);
               var begin = weeklyObj.standard_start_time.getHours();
               var finish = weeklyObj.standard_end_time.getHours();
               var interval_begin = weeklyObj.interval_start_time.getHours();
               var interval_finish = weeklyObj.interval_end_time.getHours();

               while(begin <= finish){
                toPopulateRow[begin]['day'+index] = !toPopulateRow[begin]['day'+index];
                    // toPopulateRow[begin].header_index = !toPopulateRow[begin].header_index;
                    begin++;
               }
               while(interval_begin < interval_finish){
                    toPopulateRow[interval_begin]['day'+index] = !toPopulateRow[interval_begin]['day'+index];
                    // toPopulateRow[begin].header_index = !toPopulateRow[begin].header_index;
                    interval_begin++;
               }
            }
        }
        this.setState({ rows: toPopulateRow });

        // });
    };

    getOnlyDate(array_dates){
        var newDateArray= [];
        for(let i = 0; i <= array_dates.length; i++) {
            let date = moment(array_dates[i]).startOf('day');
            newDateArray.push(date)
        }
        console.log("newDateArray", newDateArray);
    };

    isInArray(array, value) {
        return (array.find(item => {return item == value}) || []).length > 0;
    }

    header_table_html = (props) => {
        var indents = [];
        day_headers=[];
        let i = this.props.week_index;
        let final_week = i+7;
        while(i < final_week){
            day_headers.push(moment().locale(locale).add(i+1, 'days'));
            indents.push(
              <TableCell className={this.props.classes.cellsHeaderStyle} key={i}>
                {moment().locale(locale).add(i+1, 'days').format('ddd') + ' - ' +moment().locale(locale).add(i+1, 'days').format('D MMMM')}
            </TableCell>
            );
            i++;
        }
        // this.setState({ days_headers: day_headers });
        // this.fill_table_rows(day_headers);

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
        this.fill_table_rows(day_headers, initialRows);

        this.setState({
            todayDate: initialTodayDate,
            rows: initialRows,
            todayDay: initialTodayDay,
            days_headers: day_headers
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
                                    )}
                                    ${classes.cellsStyle}`}
                                    // className={` ${this.props.showBulkActions ? 'show' : 'hidden'}
                                    // ${classes.cellsStyle}`}
                                    align="right"
                                    onClick={() => row.day1 ?
                                        this.cellClickHandler(row.id, "day1") : false
                                    }
                                />
                                <TableCell
                                    className={`${this.isActive(
                                        row.day2,
                                        classes.color
                                    )}
                                     ${classes.cellsStyle}`}
                                    align="right"
                                    onClick={() => row.day2 ?
                                        this.cellClickHandler(row.id, "day2") : false
                                    }
                                />
                                <TableCell
                                    className={`${this.isActive(
                                        row.day3,
                                        classes.color
                                    )} ${classes.cellsStyle}`}
                                    align="right"
                                    disabled={!row.day3}
                                    onClick={() => row.day3 ?
                                        this.cellClickHandler(row.id, "day3") : false
                                    }
                                />
                                <TableCell
                                    className={`${this.isActive(
                                        row.day4,
                                        classes.color
                                    )} ${classes.cellsStyle}`}
                                    align="right"
                                    onClick={() => row.day4 ?
                                        this.cellClickHandler(row.id, "day4") : false
                                    }
                                />
                                <TableCell
                                    className={`${this.isActive(
                                        row.day5,
                                        classes.color
                                    )} ${classes.cellsStyle}`}
                                    align="right"
                                    onClick={() => row.day5 ?
                                        this.cellClickHandler(row.id, "day5") : false
                                    }
                                />
                                <TableCell
                                    className={`${this.isActive(
                                        row.day6,
                                        classes.color
                                    )} ${classes.cellsStyle}`}
                                    align="right"
                                    onClick={() => row.day6 ?
                                        this.cellClickHandler(row.id, "day6") : false
                                    }
                                />
                                <TableCell
                                    className={`${this.isActive(
                                        row.day7,
                                        classes.color
                                    )} ${classes.cellsStyle}`}
                                    align="right"
                                    onClick={() => row.day7 ?
                                        this.cellClickHandler(row.id, "day7") : false
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
