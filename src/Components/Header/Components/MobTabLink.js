import React from 'react';
import '../HeaderWeb.css';
import GoogleAnalytics from '../../Helpers/GoogleAnalytics';

export default function MobTabLink(props) {

    function analytics(){
        let objGA={
            category: "Header-Web Action",
            action: `${props.linkedPage} clicked`
        };
        GoogleAnalytics('', objGA);
    }

    return (
        // mtb - Mobile Tab Link
        <a href={props.link} className={(props.currentPage === props.linkedPage ? 'mtl-selected' : 'mtl-n-selected')} onClick={analytics}>
            <i className={props.icon}></i>
            <div className={props.notifCount > 10 && props.showCount
                ? 'mob-notif-cnt plus-10'
                : (props.notifCount > 0 && props.showCount
                    ? 'mob-notif-cnt less-10'
                    : 'none')}>{props.notifCount > 10 ? '10+' : props.notifCount}
            </div>
        </a>
    );
}