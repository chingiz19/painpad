import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import Validate from 'validate.js';
import Fade from 'react-reveal/Fade';
import './Search.css';
import Header from '../../Components/Header/Header';
import DynamicIcon from '../../Components/Helpers/DynamicIcon';

export default function Search(props) {
    const [search, setSearch] = useState('');
    const [searchMessage, setSearchMessage] = useState(null);
    const [showClear, setShowClear] = useState(false);

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

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

    const constraints = {
        search: {
            format: {
                pattern: "[a-zA-Z0-9.:());+-?!# ]+"
            }
        }
    };

    useQuery(IS_USER_SIGNED_IN, {
        onCompleted: data => {
            setUserId(data.isLogin.id);
            setIsSignedIn(data.isLogin.success);
            getUserInfo();
        }
    });

    const [getUserInfo] = useLazyQuery(GET_USER_INFO, {
        variables: {
            userId: parseInt(userId)
        },
        onCompleted: data => {
            setUserInfo(data && data.userProfile.user);
        }
    });

    function hadnleInputChange(value) {
        setSearch(value);
        setShowClear(value && true);

        let check = Validate({
            search: value
        }, constraints);

        setSearchMessage(check && check.search ? "Ups..Doesn't look like a valid search" : null);

        if (!check) {
            // call BE
        }
    }

    function handleInputClear() {
        setSearch('');
        setShowClear(false);
        setSearchMessage(null);
    }

    return (
        <>
            <div className="div-main">
                <div className="col-left">
                    <Header currentPage={props.pageName}
                        isSignedIn={isSignedIn}
                        userId={userId}
                        userInfo={userInfo} />
                </div>
                <div className="col-right main-search">
                    <div className="main-header">Search</div>
                    <div className="body-search">
                        <DynamicIcon type="search" width="250" height="150" />
                        <Fade>
                            <span>Search PainPad</span>
                            <div className="div-search">
                                <div className={(!searchMessage ? 'user-input search' : 'user-input search error')}>
                                    <i className="fas fa-search"></i>
                                    <input id="input-search"
                                        name="search"
                                        value={search}
                                        onChange={e => hadnleInputChange(e.target.value)}
                                        type="text" />
                                    <button className={showClear ? 'clear' : 'none'} onClick={handleInputClear}>
                                        <i className="fas fa-times"></i>
                                    </button>
                                    <span className="helper-txt">{searchMessage}</span>
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>
        </>
    );
}