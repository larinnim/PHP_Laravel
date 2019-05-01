import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import SimpleModalWrapped from '../Modal';
import { DateTimePicker } from 'react-widgets';
import "react-day-picker/lib/style.css";

const MONTHS = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
];
const WEEKDAYS_LONG = [
  'Domenica',
  'Lunedì',
  'Martedì',
  'Mercoledì',
  'Giovedì',
  'Venerdì',
  'Sabato',
];
const WEEKDAYS_SHORT = ['Do', 'Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa'];
const date = new Date();
const date2 = date.setDate(date.getDate() + 1);
console.log(date2);
const modifiers = {
  highlighted: new Date(2019, 4, 20),
};
// const highlighted = { 
//   from: new Date(), 
//   to: new Date(), 
// }

const birthdayStyle = `.DayPicker-Day--highlighted {
  background-color: orange;
  color: white;
}`;

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDays: [],
    };
  }
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
    console.log({ selectedDays});
    this.setState({ selectedDays });
  }
  render() {
    return (
      <div style={{marginTop:200}}>
            <style>{birthdayStyle}</style>

        <DayPicker
          locale='pt-BR'
          selectedDays={this.state.selectedDays}
          onDayClick={this.handleDayClick}
          months={MONTHS}
          weekdaysLong={WEEKDAYS_LONG}
          weekdaysShort={WEEKDAYS_SHORT}
          firstDayOfWeek={1}
          modifiers={modifiers}
        />
        <SimpleModalWrapped onSelectDates={this.handleTimeSlot}/>
       
      </div>
    );
  }
}
