import React, { useState } from 'react';
import './Notifications.css';
import Header from '../../Components/Header/Header';
import gql from 'graphql-tag';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import NotificationsList from '../../Components/NotificationsList';
import DynamicIcon from '../../Components/Helpers/DynamicIcon';

export default function Topic(props) {
    const [notifications, setNotifications] = useState([]);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    const IS_USER_SIGNED_IN = gql`
        query isLogin{
            isLogin {success, id}
        }
    `;

    const GET_USER_INFO = gql`
        query userProfile($userId: ID!) {
            userProfile(userId: $userId) {
                self, user{
                    id, firstName, lastName, profilePic
                }
            }
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
            getUserInfo();
        }
    });

    const [getUserInfo] = useLazyQuery(GET_USER_INFO, {
        variables: {
            userId: parseInt(userId)
        },
        onCompleted: data => {
            setUserInfo(data.userProfile.user);
            getUserNotifs();
        }
    });

    const [getUserNotifs] = useLazyQuery(GET_NOTIFICATIONS, {
        fetchPolicy: 'network-only',
        onCompleted: data => {
            setNotifications(data.notifications);
        }
    });

    return (
        <>

            <div className="div-main">
                <div className="col-left">
                    <Header currentPage={props.pageName}
                        isSignedIn={isSignedIn}
                        userId={userId} 
                        userInfo={userInfo}/>
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