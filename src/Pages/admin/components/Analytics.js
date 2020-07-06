import React from 'react';
import './AdminComponents.css';

export default function Analytics(props) {
    let data = props.data;

    return (
        // anl - Analytics
        <div className="main-anl">
            <h2 className="header-anl">Analytics</h2>
            <ul>
                <li>
                    <div className="txt">#Users</div>
                    <div className="num">{data && data.usersCnt}</div>
                </li>
                <li>
                    <div className="txt">#Posts</div>
                    <div className="num">{data && data.postsCnt}</div>
                </li>
                <li>
                    <div className="txt">#Same-Heres</div>
                    <div className="num">{data && data.sameHereCnt}</div>
                </li>
                <li>
                    <div className="txt">#Pending posts</div>
                    <div className="num">{data && data.pendingPostsCnt}</div>
                </li>
            </ul>
        </div>
    );
}