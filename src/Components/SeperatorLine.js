import React from 'react';
import './SeperatorLine.css';

export default function LineSeperator(props) {
    return (
        <div className="line-seperator">
            <div className="line"></div>
            <span className="txt">{props.thisValue}</span>
        </div>
    );
}