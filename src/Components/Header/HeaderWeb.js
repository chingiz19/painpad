import React from 'react';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import './HeaderWeb.css';
import UserSignInUp from '../../Modals/SignInUp/SignInUp';
import WebTabLink from './Components/WebTabLink';
import WebTabOnClick from './Components/WebTabOnClick';
import GoogleAnalytics from '../../Components/Helpers/GoogleAnalytics';

import LogoTransperent from '../../images/logos/logo_transparent.png';

export default function HeaderWeb(props) {
    let notifCount = props.notifCount;

    const USER_SIGN_OUT = gql`
        query signout{
            signout
        }
    `;

    const [callUserSignOut] = useLazyQuery(USER_SIGN_OUT, {
        onCompleted: data => {
            let objGA={
                category: "Header-Web Action",
                action: "Sign out clicked"
            };
            GoogleAnalytics('', objGA);

            window.location.href = "/";
        }
    });

    function analytics(){
        let objGA={
            category: "Header-Web Action",
            action: "PainPad Logo clicked"
        };
        GoogleAnalytics('', objGA);
    }

    return (
        <>
            <div className="web-header">
                <a href="/" onClick={analytics} className="a-logo-hdr-web">
                    <img src={LogoTransperent} className="header-logo" alt="Transperent Logo" />
                </a>
                <ul className="guest-user-ul" style={{ display: !props.isSignedIn ? '' : 'none' }}>
                    <WebTabLink link="/" 
                        linkedPage="Home" 
                        icon="fas fa-home" 
                        text="Home" 
                        currentPage={props.currentPage} />
                    <li className="wh-li">
                        <UserSignInUp withButton={true} 
                            text="Sign in / Sign up"/>
                    </li>
                    <WebTabLink link="/about" 
                        linkedPage="About" 
                        icon="fas fa-question" 
                        text="About" 
                        currentPage={props.currentPage} />
                </ul>
                <ul className="user-ul" style={{ display: props.isSignedIn ? '' : 'none' }}>
                    <WebTabLink link="/"
                        linkedPage="Home"
                        icon="fas fa-home"
                        text="Home"
                        currentPage={props.currentPage} />
                    <WebTabLink
                        link={'/users/' + props.userId}
                        linkedPage="Profile"
                        icon="fas fa-user"
                        text="Profile"
                        currentPage={props.currentPage} />
                    <WebTabLink link="/notifications"
                        linkedPage="Notifications"
                        icon="fas fa-bell"
                        text="Notifications"
                        currentPage={props.currentPage}
                        showCount={true}
                        notifCount={notifCount} />
                    <WebTabLink link="/search"
                        linkedPage="Search"
                        icon="fas fa-search"
                        text="Search"
                        currentPage={props.currentPage} />
                    <WebTabLink link="/about"
                        linkedPage="About"
                        icon="fas fa-question"
                        text="About"
                        currentPage={props.currentPage} />
                    <br />
                    <WebTabOnClick onClick={callUserSignOut}
                        icon="fas fa-sign-out-alt"
                        text="Log out" />
                </ul>
            </div>
        </>
    );
}