import React from 'react';
import Notification from './Notification';

export default function NotificationsList(props) {
    let listNotifs = [];

    if (props.notifs.length > 0) {
        listNotifs = props.notifs
            .map((notif) => <Notification key={notif.id} notif={notif}/>);
    }

    return (listNotifs);
}