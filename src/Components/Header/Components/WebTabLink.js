import React from 'react';
import '../HeaderWeb.css';
import GoogleAnalytics from '../../Helpers/GoogleAnalytics';

export default function WebTabLink(props) {
    let notifCount = props.notifCount;

    function analytics(){
        let objGA={
            category: "Header-Web Action",
            action: `${props.text} clicked`
        };
        GoogleAnalytics('', objGA);
    }

    return (
        <li className="wh-li">
            <a href={props.link} className="wh-li-a" onClick={analytics}>
                <div className="wh-li-a-div">
                    <div className={(props.currentPage === props.linkedPage ? 'li-selected wh-li-a-div-div' : 'wh-li-a-div-div')}>
                        <i className={props.icon}></i><span>{props.text}</span>
                        <div className={notifCount > 10 && props.showCount
                            ? 'div-notif-count plus-10'
                            : (notifCount > 0 && props.showCount
                                ? 'div-notif-count less-10'
                                : 'none')}>{notifCount > 10 ? '10+' : notifCount}
                        </div>
                    </div>
                </div>
            </a>
        </li>
    );
}