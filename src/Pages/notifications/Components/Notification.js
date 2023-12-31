import React from 'react';
import FadeIn from 'react-fade-in';
import Moment from 'react-moment';
import '../Notifications.css';
import DynamicIcon from '../../../Components/Helpers/DynamicIcon';
import GoogleAnalytics from '../../../Components/Helpers/GoogleAnalytics';

export default function Notification(props) {
    const obj = props.notif;

    if (!Array.isArray(obj.description)) {
        let tmp = obj.description.split('<span>');
        obj.description = [];
        for (let i = 0; i < 3; i++) {
            obj.description.push(tmp[i])
        }
    }

    function analytics(){
        let objGA={
            category: "Notifications Action",
            action: `${obj.header} clicked`
        };
        GoogleAnalytics('', objGA);
    }

    return (
        <FadeIn>
            <a className="container-notif" href={obj.action} onClick={analytics}>
                <div className={obj.seen ? 'notif-none' : 'div-unread'}><span></span></div>
                <div className="header-notif reward" style={{ backgroundColor: obj.type.backgroundColor, borderColor: obj.type.backgroundColor }}>
                    <span className="txt">{obj.header}</span>
                    <span className="date"><Moment date={obj.created} format="D MMM" withTitle /></span>
                </div>
                <div className="body-notif">
                    <div className="div-icon">
                        <img alt="User" className={obj.type.isUserIcon ? 'img' : 'notif-none'} src={obj.icon} />
                        <div className={!obj.type.isUserIcon ? '' : 'notif-none'}>
                            <DynamicIcon type={obj.type.icon} loop={!obj.seen && true} width="100" height="100" />
                        </div>
                    </div>
                    <div className="subbody-notif">
                        <h4>{obj.subheader}</h4>
                        <h5>{obj.description[0]} <span className="span-reason">{obj.description[1]}</span> {obj.description[2]}</h5>
                        <p>{obj.postText}</p>
                    </div>
                </div>
            </a>
        </FadeIn>
    );
}