import React from 'react';
import '../../Pages/notifications/Notifications.css';
import Moment from 'react-moment';
import DynamicIcon from '../Helpers/DynamicIcon';

export default function Notification(props) {
    let obj = props.notif;

    if(obj && obj.description.split('<span>').length > 0){
        let tmp = obj.description.split('<span>');
        obj.description = {
            'p1': tmp[0],
            'p2': tmp[1],
            'p3': tmp[2]
        }
    }

    return (
        <a className="container-notif" href={obj.action}>
            <div className={obj.seen ? 'notif-none' : 'div-unread'}><span></span></div>
            <div className="header-notif reward" style={{backgroundColor: obj.type.backgroundColor, borderColor: obj.type.backgroundColor}}>
                <span className="txt">{obj.header}</span>
                <span className="date"><Moment date={obj.created} format="D MMM" withTitle /></span>
            </div>
            <div className="body-notif">
                <div className="div-icon">
                    <img alt="User" className={obj.type.isUserIcon ? 'img' : 'notif-none'} src={obj.icon} />
                    <div className={!obj.type.isUserIcon ? '' : 'notif-none'}>
                        <DynamicIcon type={obj.type.icon} width="100" height="100" />
                    </div>
                </div>
                <div className="subbody-notif">
                    <h4>{obj.subheader}</h4>
                    <h5>{obj.description.p1} <span className="span-reason">{obj.description.p2}</span> {obj.description.p3}</h5>
                    <p>{obj.postText}</p>
                </div>
            </div>
        </a>
    );
}