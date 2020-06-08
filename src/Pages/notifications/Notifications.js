import React, { useState } from 'react';
import './Notifications.css';
import HeaderWeb from '../../Components/HeaderWeb';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import NotificationsList from '../../Components/NotificationsList';
import DynamicIcon from '../../Components/Helpers/DynamicIcon';

export default function Topic(props) {
    const [notifications, setNotifications] = useState([]);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState(false);

    const IS_USER_SIGNED_IN = gql`
        query isLogin{
            isLogin {success, id}
        }
    `;

    const GET_NOTIFICATIONS = gql`
        query notifications {
            notifications {
                id, header, subheader, description, created, icon, action, 
                type{
                  id, backgroundColor, icon, isUserIcon, description
                },
                postText,
                seen
              }
        }
    `;

    useQuery(IS_USER_SIGNED_IN, {
        onCompleted: data => {
            setUserId(data.isLogin.id);
            setIsSignedIn(data.isLogin.success);
        }
    });

    useQuery(GET_NOTIFICATIONS, {
        onCompleted: data => {
            setTimeout(() => {
                setNotifications(data.notifications);
            }, 1000);
        }
    });

    return (
        <>

            <div className="div-main">
                <div className="col-left">
                    <HeaderWeb currentPage={props.pageName}
                        isSignedIn={isSignedIn}
                        userId={userId} />
                </div>
                <div className="col-right main-notif">
                    <div className="main-header">Notifications</div>
                    {!notifications.length
                        ?
                        <DynamicIcon type="loading" width="150" height="150" />
                        :
                        <NotificationsList notifs={notifications} />}
                </div>
            </div>
        </>
    );
}