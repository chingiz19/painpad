import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import GoogleAnalytics from '../../Helpers/GoogleAnalytics';

export default function Sidebar(props) {
    const [showSideBar, setShowSideBar] = useState(false);

    const USER_SIGN_OUT = gql`
        query signout{
            signout
        }
    `;

    function hideSB() {
        let element = document.getElementById("SB-main");
        element.removeEventListener("click", handleLisener)
        element.classList.add("hide-sec-SB");
        setTimeout(() => {
            element.classList.add("none");
            element.classList.remove("hide-sec-SB");
        }, 245);
    }

    function showSB() {
        let element = document.getElementById("SB-main");
        element.addEventListener("click", handleLisener);
        element.classList.remove("none");
        element.classList.add("show-sec-SB");
    }

    function handleLisener(e) {
        if (e.target.id !== "SB-main") return;
        hideSB();
    }

    function handleSB() {
        if (showSideBar) {
            hideSB();
        } else {
            showSB();
        }
        analytics("Sidebar-Mob Action", `${showSideBar ? 'Close' : 'Open'} Sidebar clicked`);
        setShowSideBar(!showSideBar);
    }

    const [callUserSignOut] = useLazyQuery(USER_SIGN_OUT, {
        onCompleted: data => {
            analytics('Sidebar-Mob Action', 'Log Out clicked');
            window.location.href = '/';
        }
    });

    function analytics(category, action){
        let objGA={
            category: category,
            action: action
        };
        GoogleAnalytics('', objGA);
    }

    return (
        <>
            <button className={props.isSignedIn ? 'signed' : 'none'} onClick={handleSB}>
                <i className="fas fa-angle-left"></i>
            </button>
            <div id="SB-main" className="none">
                <div className="SB">
                    <div className="sb-header">
                        <div className="user-info">
                            <img alt="User" src={props.userInfo && props.userInfo.profilePic} className="prof-pic" />
                            <div className="names">{props.userInfo && (props.userInfo.firstName + ' ' + props.userInfo.lastName)}</div>
                        </div>
                        <button className="btn-close" onClick={handleSB}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <ul className="sb-body">
                        <li>
                            <a href={'/users/' + props.userId} onClick={() => analytics('Sidebar-Mob Action', 'My Profile Link clicked')}>
                                <i className="fas fa-user"></i><span>My profile</span>
                            </a>
                        </li>
                        <li>
                            <a href="/about" onClick={() => analytics('Sidebar-Mob Action', 'About Page Link clicked')}>
                                <i className="fas fa-question"></i><span>About PainPad</span>
                            </a>
                        </li>
                        <br />
                        <li onClick={callUserSignOut}>
                            <i className="fas fa-sign-out-alt"></i><span>Log out</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}