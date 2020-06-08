import React from 'react'
import './Maps.css'

export default function UserShortInfo(props) {
    return (
        <a href={'/users/' + (props.userInfo.id)} className="user-short-info">
            <img src={props.userInfo.profilePic} className="user-prof-pic" alt="User Profile" />
            <ul>
                <li className="user-name-li">{props.userInfo.firstName + ' ' + props.userInfo.lastName}</li>
                <li className="user-industry-li">{props.userInfo.industry}</li>
            </ul>
        </a>
    );
}