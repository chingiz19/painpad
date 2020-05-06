import React from 'react'
import './Maps.css'

export default function UserShortInfo(props) {

    return (
        <a href={'/users/' + (props.userId)} className="user-short-info">
            <img src={props.profilePic} className="user-prof-pic" alt="User Profile" />
            <ul>
                <li className="user-name-li">{props.firstName + ' ' + props.lastName}</li>
                <li className="user-industry-li">{props.industry}</li>
            </ul>
        </a>
    );
}