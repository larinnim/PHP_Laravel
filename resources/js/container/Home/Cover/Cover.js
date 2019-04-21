import React from "react";
import homeCover from "../../../../img/cover_home.png";
import "./Cover.css";

const cover = props => (
    <div className="Cover">
        <img src={homeCover} alt="Cover" />
    </div>
);

export default cover;
