import React from 'react';
import '../About.css';

export default function SeperatorLineAbout(props) {

    return (
        // ASL - About (page) Seperator Line
        <div className="div-ASL">
            <div className="line"></div>
            <div className="txt">{props.label}</div>
        </div>
    );
}