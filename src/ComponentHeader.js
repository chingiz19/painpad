import React from 'react';
import './ComponentHeader.css';


export default function ComponentHeader(props) {
    return (
        <div className="comp-header">
            <text>{props.contentText}</text>
            <div></div>
        </div>
    );
}