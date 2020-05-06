import React from 'react';
import './HeaderWeb.css';
import LogoTransperent from '../images/logos/logo_transparent.png';
import UserSignInUp from '../Modals/UserSignInUp';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';

export default function HeaderWeb(props) {
    let isUserSignedIn = props.isUserSignedIn;

    const USER_SIGN_OUT = gql`
        query signout{
            signout
        }
    `;

    const [callUserSignOut, { data: userSignOut }] = useLazyQuery(USER_SIGN_OUT);

    if(userSignOut){
        window.location.reload();
    }

    return (
        <>
            <div className="header-div">
                {/* TODO make li as a seperate component - repeats */}
                <a href="/" className="a-logo-hdr-web">
                    <img src={LogoTransperent} className="header-logo" alt="Transperent Logo" />
                </a>
                <ul className="guest-user-ul" style={{ display: !(isUserSignedIn && isUserSignedIn.isLogin.success) ? '' : 'none' }}>
                    <li className="wh-li">
                        <a href="/" className="wh-li-a">
                            <div className="wh-li-a-div">
                                <div className={(props.currentPage === 'home' ? 'li-selected wh-li-a-div-div' : 'wh-li-a-div-div')}>
                                    <i className="fas fa-home"></i>Home
                                </div>
                            </div>
                        </a>
                    </li>
                    <li className="wh-li">
                        <UserSignInUp name="Sign in / Sign up" />
                    </li>
                    <li className="wh-li">
                        <a href="/about" className="wh-li-a">
                            <div className="wh-li-a-div">
                                <div className={(props.currentPage === 'about' ? 'li-selected wh-li-a-div-div' : 'wh-li-a-div-div')}>
                                    <i className="far fa-comment"></i>About
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
                <ul className="user-ul" style={{ display: (isUserSignedIn && isUserSignedIn.isLogin.success) ? '' : 'none' }}>
                    <li className="wh-li">
                        <a href="/" className="wh-li-a">
                            <div className="wh-li-a-div">
                                <div className={(props.currentPage === 'home' ? 'li-selected wh-li-a-div-div' : 'wh-li-a-div-div')}>
                                    <i className="fas fa-home"></i>Home
                                </div>
                            </div>
                        </a>
                    </li>
                    <li className="wh-li">
                        <a href={'/users/' + (isUserSignedIn && isUserSignedIn.isLogin.id)} className="wh-li-a">
                            <div className="wh-li-a-div">
                                <div className={(props.currentPage === 'profile' ? 'li-selected wh-li-a-div-div' : 'wh-li-a-div-div')}>
                                    <i className="far fa-user"></i>Profile
                                </div>
                            </div>
                        </a>
                    </li>
                    <li className="wh-li">
                        <div className="wh-li-div">
                            <span className="wh-li-div-span">
                                <div className="wh-li-div-span-div">
                                    <i className="far fa-bell"></i>Notification
                                </div>
                            </span>
                        </div>
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
                                <div className={(props.currentPage === 'about' ? 'li-selected wh-li-a-div-div' : 'wh-li-a-div-div')}>
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