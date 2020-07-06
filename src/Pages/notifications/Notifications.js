import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import './Notifications.css';
import Header from '../../Components/Header/Header';
import InfiniteScroll from 'react-infinite-scroll-component';
import NotificationsList from './Components/NotificationsList';
import DynamicIcon from '../../Components/Helpers/DynamicIcon';
import GoogleAnalytics from '../../Components/Helpers/GoogleAnalytics';

export default function Topic(props) {
    const [notifications, setNotifications] = useState(0);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [hasMore, setHasMore] = useState(true);

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
        query notifications ($limit: Int!) {
            notifications (limit: $limit){
                id, header, subheader, description, created, icon, action, 
                type{
                  id, backgroundColor, icon, isUserIcon, description
                },
                postText,
                seen
              }
        }
    `;

    const GET_MORE_NOTIFS = gql`
        query notifications ($limit: Int!, $lastDate: Float!) {
            notifications (limit: $limit, lastDate: $lastDate){
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

            GoogleAnalytics('/notifications', {});
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

    const [getUserNotifs, { loading: notifLoading }] = useLazyQuery(GET_NOTIFICATIONS, {
        fetchPolicy: 'network-only',
        variables: {
            limit: 10
        },
        onCompleted: data => {
            setNotifications(data.notifications);
        }
    });

    const [getMoreNotifs] = useLazyQuery(GET_MORE_NOTIFS, {
        onCompleted: data => {
            let tmpArray = notifications.concat(data.notifications);
            if (tmpArray.length === notifications.length) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
            setNotifications(tmpArray);
        }
    });

    function handleLoadMore() {
        setTimeout(() => {
            getMoreNotifs({
                variables: {
                    limit: 5,
                    lastDate: notifications && notifications[notifications.length - 1].created
                }
            });
        }, 400);
    };

    return (
        <>
            <div className="div-main">
                <div className="col-left">
                    <Header currentPage={props.pageName}
                        isSignedIn={isSignedIn}
                        userId={userId}
                        userInfo={userInfo} />
                </div>
                <div id="main-notif" className="col-right main-notif">
                    <div className="main-header">Notifications</div>

                    {!isSignedIn || !userId || !userInfo || notifLoading
                        ? <DynamicIcon type="loading" width="150" height="150" />
                        : (
                            notifications.length === 0
                                ? <div className="empty-notif">
                                    <DynamicIcon type="noFollow" width="200" height="200" />
                                    <h2>List is Empty</h2>
                                    <p>Let's get active and <a href="/">tell</a> the serrounding a problem that can't be solved on your own.</p>
                                </div>
                                : (
                                    <InfiniteScroll
                                        scrollableTarget="main-notif"
                                        scrollThreshold={1}
                                        dataLength={notifications ? notifications.length : 0}
                                        next={handleLoadMore}
                                        hasMore={hasMore}
                                        loader={
                                            (notifications.length > 5 && <DynamicIcon type='loading' width={80} height={80} />)
                                        }
                                        endMessage={
                                            <div className="end-message">Yay! You have seen it all</div>
                                        }>
                                        <NotificationsList notifs={notifications} />
                                    </InfiniteScroll>
                                )
                        )}
                </div>
            </div>
        </>
    );
}