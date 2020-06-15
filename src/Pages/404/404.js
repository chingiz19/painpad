import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import './404.css';
import DynamicIcon from '../../Components/Helpers/DynamicIcon';
import Header from '../../Components/Header/Header';


export default function NotFound(props) {
    const screenX = window.screen.width;

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
            setUserInfo(data.userProfile.user);
        }
    });

    return (
        <>
            <div className="div-main">
                <div className="col-left">
                    <Header currentPage={props.pageName}
                        isSignedIn={isSignedIn}
                        userId={userId} 
                        userInfo={userInfo}/>
                </div>
                <div className="col-right">
                    <div className="main main-404">
                        <DynamicIcon type="notFound" width={screenX > 600 ? '400' : '300'} height={screenX > 600 ? '280' : '210'} />
                        <h2>Page Not Found</h2>
                        <p>Sorry, this page could not be found. You may want to check <a href="/">home page</a>.</p>
                    </div>
                </div>
            </div>
        </>
    );
}