import React from 'react';
import './AdminComponents.css';

export default function Analytics() {

    return (
        // anl - Analytics
        <div className="main-anl">
            <h2 className="header-anl">Analytics</h2>
            <ul>
                <li>
                    <div className="txt">#Users</div>
                    <div className="num">4</div>
                </li>
                <li>
                    <div className="txt">#Posts</div>
                    <div className="num">22</div>
                </li>
                <li>
                    <div className="txt">#Same-Heres</div>
                    <div className="num">67</div>
                </li>
                <li>
                    <div className="txt">#Pending posts</div>
                    <div className="num">4</div>
                </li>
            </ul>
            
        </div>
    );
}