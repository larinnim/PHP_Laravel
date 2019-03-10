import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const agents = (props) => {
 const [state_var, set_state] = useState({
     startDate: new Date(),
     isToggled: true
 });
//  handleChange = handleChange.bind(this);
    const switchHandler = () => {
        set_state({
            isToggled: !state_var.isToggled
        });
        console.log(state_var);
        // alert('CLICKEDD');
    }
    
    const handleChange = (date) => { //Function that do something on a click
        set_state({
            startDate: date
        });
        alert(date);
        console.log(state_var);
    };

    return (
        <div>
            {props.title}
            <button onClick={switchHandler}>Click</button>
            <DatePicker
            selected={state_var.startDate}
            onChange={handleChange}
            />
        </div>
    );
}


export default agents;