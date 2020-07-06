import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import HeaderWeb from './HeaderWeb';
import HeaderMob from './HeaderMob';
import gql from 'graphql-tag';
import { useQuery, useSubscription } from '@apollo/react-hooks';

export default function Header(props) {
    const [notifCount, setNotifCount] = useState(0);

    const GET_NOTIFICATION_COUNT = gql`
        query newNotificationCount{
            newNotificationCount
        }
    `;

    const NEW_NOTIFICATION_COUNT = gql`
        subscription newNotificationCount{
            newNotificationCount
        }
    `;

    useQuery(GET_NOTIFICATION_COUNT, {
        onCompleted: data => {
            setNotifCount(data.newNotificationCount);
        }
    });

    useSubscription(NEW_NOTIFICATION_COUNT, {
        onSubscriptionData: ({ subscriptionData }) => {
            setNotifCount(subscriptionData.data.newNotificationCount);
        }
    });

    return (
        <>
            {
                props.currentPage === 'Profile'
                    ?
                    <Helmet>
                        <title>{notifCount > 10 ? '(10+)' : (notifCount > 0 ? '(' + notifCount + ')' : '')} {props.pageTitle}</title>
                    </Helmet>
                    :
                    <Helmet>
                        <title>{notifCount > 10 ? '(10+)' : (notifCount > 0 ? '(' + notifCount + ')' : '')} PainPad | {props.currentPage}</title>
                    </Helmet>
            }
            <HeaderWeb currentPage={props.currentPage} 
                isSignedIn={props.isSignedIn} 
                userId={props.userId}
                userInfo={props.userInfo} 
                notifCount={notifCount}/>
            <HeaderMob currentPage={props.currentPage} 
                isSignedIn={props.isSignedIn} 
                userId={props.userId} 
                userInfo={props.userInfo}
                notifCount={notifCount}/>
        </>
    );
}