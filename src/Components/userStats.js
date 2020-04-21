import React from 'react';
import './userStats.css'

export default function UserStats(){
 
    return(
        <div className="user-stats-div">
            <ul>
                <li className="li-num">210</li>
                <li className="li-text">points</li>
            </ul>
            <ul>
                <li className="li-num">35</li>
                <li className="li-text">followers</li>
            </ul>
            <ul>
                <li className="li-num">24</li>
                <li className="li-text">following</li>
            </ul>
        </div>
    );
}