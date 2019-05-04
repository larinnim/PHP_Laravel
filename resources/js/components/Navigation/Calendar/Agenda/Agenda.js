import React from "react";
import "./Agenda.css";

const agenda = props => (
    <div className="Agenda">
        <span
            style={{
                display: "inline-block",
                margin: "0 8px",
                padding: "5px"
            }}
        >
            <strong>Busy At:</strong>
        </span>
        <span
            style={{
                display: "inline-block",
                margin: "0 8px",
                border: "1px solid #ccc",
                padding: "5px"
            }}
        >
            Date: {props.Date}
        </span>
        <span
            style={{
                display: "inline-block",
                margin: "0 8px",
                border: "1px solid #ccc",
                padding: "5px"
            }}
        >
            Time: {props.Time}
        </span>
        
    </div>
);

export default agenda;
