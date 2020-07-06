import React from 'react';
import './Maps.css';
import GoogleAnalytics from '../Helpers/GoogleAnalytics';

export default function UserShortInfo(props) {
    function analytics(){
        let objGA={
            category: `${props.origin} Action`,
            action: "User Short Info clicked"
        };
        GoogleAnalytics('', objGA);
    }

    return (
        <a href={'/users/' + (props.userInfo.id)} className="user-short-info" onClick={analytics}>
            <img src={props.userInfo.profilePic} className="user-prof-pic" alt="User Profile" />
            <ul>
                <li className="user-name-li">{props.userInfo.firstName + ' ' + props.userInfo.lastName}</li>
                <li className="user-industry-li">{props.userInfo.industry}</li>
            </ul>
        </a>
    );
}