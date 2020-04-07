import React from 'react';
import './HeaderWeb.css';
import LogoTransperent from '../images/logos/logo_transparent.png';
import UserSignInUp from '../Modals/UserSignInUp';

export default function HeaderWeb() {
    return (
        <>
            <div className="header-div">
                <img src={LogoTransperent} className="header-logo" alt="Transperent Logo"/>
                <ul>
                    <li>
                        <UserSignInUp name="Sign in / Sign up"/>
                    </li>
                    <li>
                        <a href="/about">
                            <div>About</div>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}