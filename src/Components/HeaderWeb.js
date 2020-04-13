import React, { useState } from 'react';
import './HeaderWeb.css';
import LogoTransperent from '../images/logos/logo_transparent.png';
import UserSignInUp from '../Modals/UserSignInUp';

export default function HeaderWeb() {
    const [userSignedIn, setUserSignedIn] = useState(true);

    const userSignOut = () => {
        setUserSignedIn(false);
    }

    return (
        <>
            <div className="header-div">
                <a href="/" className="a-logo-hdr-web">
                    <img src={LogoTransperent} className="header-logo" alt="Transperent Logo" />
                </a>
                <ul className="guest-user-ul" style={{ display: !userSignedIn ? '' : 'none' }}>
                    <li className="wh-li">
                        <UserSignInUp name="Sign in / Sign up" />
                    </li>
                    <li className="wh-li">
                        <a href="/about" className="wh-li-a">
                            <div className="wh-li-a-div">
                                <div className="wh-li-a-div-div">
                                    <i className="far fa-comment"></i>About
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
                <ul className="user-ul" style={{ display: userSignedIn ? '' : 'none' }}>
                    <li className="wh-li">
                        <a href="/users/elnarsharifli" className="wh-li-a">
                            <div className="wh-li-a-div">
                                <div className="wh-li-a-div-div">
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
                                <div className="wh-li-a-div-div">
                                    <i className="far fa-comment"></i>About
                                </div>
                            </div>
                        </a>
                    </li>
                    <br />
                    <li className="wh-li log-out" onClick={userSignOut}>
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