import React from 'react';
import '../HeaderWeb.css';

export default function WebTabOnClick(props) {

    function handleOnClick() {
        props.onClick();
    }

    return (
        <li className="wh-li log-out" onClick={handleOnClick}>
            <div className="wh-li-div">
                <span className="wh-li-div-span">
                    <div className="wh-li-a-div-div">
                        <i className={props.icon}></i><span>{props.text}</span>
                    </div>
                </span>
            </div>
        </li>
    );
}