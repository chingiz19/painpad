import React, { useState } from 'react';
import LogoTransperent from '../../../images/logos/logo_transparent.png';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';

export default function HeaderAdmin(props) {
    const [compType, setCompType] = useState('post');

    const USER_SIGN_OUT = gql`
        query signout{
            signout
        }
    `;

    const [callUserSignOut, { data: userSignOut }] = useLazyQuery(USER_SIGN_OUT, {
        onCompleted: data => {
            window.location.href = "/";
        }
    });

    if (userSignOut) {
        window.location.reload();
    }

    function selectComp(type) {
        setCompType(type);
        props.selectComp(type);
    }

    return (
        <>
            <div className="header-div">
                {/* TODO make li as a seperate component - repeats */}
                <a href="/" className="a-logo-hdr-web">
                    <img src={LogoTransperent} className="header-logo" alt="Transperent Logo" />
                </a>
                <ul className="user-ul">
                    <li className="wh-li">
                        <a href="/" className="wh-li-a">
                            <div className="wh-li-a-div">
                                <div className="wh-li-a-div-div">
                                    <i className="fas fa-home"></i>Home
                                </div>
                            </div>
                        </a>
                    </li>
                    <li className="wh-li">
                        <div className="wh-li-div" onClick={() => selectComp('post')}>
                            <span className="wh-li-div-span">
                                <div className={(compType === 'post' ? 'li-selected wh-li-div-span-div' : 'wh-li-div-span-div')}>
                                    <i className="fas fa-feather-alt"></i>Posts
                                </div>
                            </span>
                        </div>
                    </li>
                    <li className="wh-li">
                        <div className="wh-li-div" onClick={() => selectComp('analytics')}>
                            <span className="wh-li-div-span">
                                <div className={(compType === 'analytics' ? 'li-selected wh-li-div-span-div' : 'wh-li-div-span-div')}>
                                    <i className="fas fa-chart-pie"></i>Analytics
                                </div>
                            </span>
                        </div>
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