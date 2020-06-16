import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import './HeaderMob.css';
import UserSignInUp from '../../Modals/SignInUp/SignInUp';
import Sidebar from './Components/Sidebar';
import MobTabLink from './Components/MobTabLink';

import LogoTransperent from '../../images/logos/logo_transparent.png';

export default function HeaderWeb(props) {
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
            setNotifCount(data && data.newNotificationCount);
        }
    });

    useSubscription(NEW_NOTIFICATION_COUNT, {
        onSubscriptionData: ({ subscriptionData }) => {
            setNotifCount(subscriptionData.data.newNotificationCount);
        }
    });

    return (
        <>
            <div className="mob-header">
                <div className="top">
                    <div className="left">
                        <a href="/" className="a-logo">
                            <img src={LogoTransperent} alt="Transperent Logo" />
                        </a>
                        <div className="page-name">{props.currentPage}</div>
                    </div>
                    <div className="right">
                        {/* <div className={props.isSignedIn ? 'none' : 'not-signed'}>
                            <UserSignInUp withButton={true} 
                                text="Sign In"
                                notifCount={notifCount}/>
                        </div>
                        <Sidebar isSignedIn={props.isSignedIn}
                            userId={props.userId}
                            userInfo={props.userInfo}/> */}
                        {props.isSignedIn
                            ? (<Sidebar isSignedIn={props.isSignedIn}
                                userId={props.userId}
                                userInfo={props.userInfo} />)
                            : (<MobTabLink link="/about"
                                linkedPage="About"
                                icon="fas fa-question"
                                currentPage={props.currentPage} />)}
                    </div>
                </div>
                <div className="bottom">

                    {
                        props.isSignedIn
                            ? <>
                                <MobTabLink link="/"
                                    linkedPage="Home"
                                    icon="fas fa-home"
                                    currentPage={props.currentPage} />
                                <MobTabLink link="/search"
                                    linkedPage="Search"
                                    icon="fas fa-search"
                                    currentPage={props.currentPage} />
                                <MobTabLink link="/notifications"
                                    linkedPage="Notifications"
                                    icon="fas fa-bell"
                                    currentPage={props.currentPage}
                                    showCount={true}
                                    notifCount={notifCount} />
                                <MobTabLink link="/about"
                                    linkedPage="About"
                                    icon="fas fa-question"
                                    currentPage={props.currentPage} />
                                </>
                            : (
                                <div className="not-signed">
                                    <div className="sign-in">
                                        <UserSignInUp withButton={true} 
                                            text="Sign In" 
                                            showSingUp={false}/>
                                    </div>
                                    <div className="sign-up">
                                        <UserSignInUp withButton={true} 
                                            text="Sign Up" 
                                            showSingUp={true}/>
                                    </div>
                                    
                                </div>
                            )
                    }




                </div>
            </div>
        </>
    );
}