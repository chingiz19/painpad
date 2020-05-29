import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import './HeaderWeb.css';
import LogoTransperent from '../images/logos/logo_transparent.png';
import UserSignInUp from '../Modals/SignInUp/SignInUp';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useLazyQuery } from '@apollo/react-hooks';

export default function HeaderWeb(props) {
    let isSignedIn = props.isSignedIn;

    const [notifCount, setNotifCount] = useState(0);

    const USER_SIGN_OUT = gql`
        query signout{
            signout
        }
    `;

    const GET_NOTIFICATION_COUNT = gql`
        query newNotificationCount{
            newNotificationCount
        }
    `;

    const [callUserSignOut] = useLazyQuery(USER_SIGN_OUT, {
        onCompleted: data =>{
            window.location.href = "/";
        }
    });

    useQuery(GET_NOTIFICATION_COUNT, {
        onCompleted: data => {
            setNotifCount(data.newNotificationCount);
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
            <div className="header-div">
                {/* TODO make li as a seperate component - repeats */}
                <a href="/" className="a-logo-hdr-web">
                    <img src={LogoTransperent} className="header-logo" alt="Transperent Logo" />
                </a>
                <ul className="guest-user-ul" style={{ display: !(isSignedIn && isSignedIn.isLogin.success) ? '' : 'none' }}>
                    <li className="wh-li">
                        <a href="/" className="wh-li-a">
                            <div className="wh-li-a-div">
                                <div className={(props.currentPage === 'Home' ? 'li-selected wh-li-a-div-div' : 'wh-li-a-div-div')}>
                                    <i className="fas fa-home"></i>Home
                                </div>
                            </div>
                        </a>
                    </li>
                    <li className="wh-li">
                        <UserSignInUp name="Sign in / Sign up" withButton={true} />
                    </li>
                    <li className="wh-li">
                        <a href="/about" className="wh-li-a">
                            <div className="wh-li-a-div">
                                <div className={(props.currentPage === 'About' ? 'li-selected wh-li-a-div-div' : 'wh-li-a-div-div')}>
                                    <i className="far fa-comment"></i>About
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
                <ul className="user-ul" style={{ display: (isSignedIn && isSignedIn.isLogin.success) ? '' : 'none' }}>
                    <li className="wh-li">
                        <a href="/" className="wh-li-a">
                            <div className="wh-li-a-div">
                                <div className={(props.currentPage === 'Home' ? 'li-selected wh-li-a-div-div' : 'wh-li-a-div-div')}>
                                    <i className="fas fa-home"></i>Home
                                </div>
                            </div>
                        </a>
                    </li>
                    <li className="wh-li">
                        <a href={'/users/' + (isSignedIn && isSignedIn.isLogin.id)} className="wh-li-a">
                            <div className="wh-li-a-div">
                                <div className={((props.currentPage === 'Profile' && props.isSelf) ? 'li-selected wh-li-a-div-div' : 'wh-li-a-div-div')}>
                                    <i className="far fa-user"></i>Profile
                                </div>
                            </div>
                        </a>
                    </li>
                    <li className="wh-li">
                        <a href={'/notifications'} className="wh-li-a">
                            <div className="wh-li-a-div">
                                <div className={(props.currentPage === 'Notifications' ? 'li-selected wh-li-a-div-div' : 'wh-li-a-div-div')}>
                                    <i className="far fa-bell"></i>Notifications
                                    <div className={notifCount > 10 ? 'div-notif-count plus-10' : (notifCount > 0 ? 'div-notif-count less-10' : 'none')}>{notifCount > 10 ? '10+' : notifCount}</div>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li className="wh-li">
                        <div className="wh-li-div">
                            <span className="wh-li-div-span">
                                <div className="wh-li-div-span-div">
                                    <i className="far fa-paper-plane"></i>Invite friend
                                </div>
                            </span>
                        </div>
                    </li>
                    <li className="wh-li">
                        <a href="/about" className="wh-li-a">
                            <div className="wh-li-a-div">
                                <div className={(props.currentPage === 'About' ? 'li-selected wh-li-a-div-div' : 'wh-li-a-div-div')}>
                                    <i className="far fa-comment"></i>About
                                </div>
                            </div>
                        </a>
                    </li>
                    <br />
                    <li className="wh-li log-out" onClick={callUserSignOut}>
                        <div className="wh-li-div">
                            <span className="wh-li-div-span">
                                <div className="wh-li-div-span-div">
                                    <i className="fas fa-sign-out-alt"></i>Log out
                                </div>
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}