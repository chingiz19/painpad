import React, { useState } from 'react';
import './About.css';
import gql from 'graphql-tag';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import Fade from 'react-reveal/Fade';
import Header from '../../Components/Header/Header';
import AboutHeader from './Components/AboutHeader';
import EntrepreneurAdvice from './Components/EntrepreneurAdvice';
import SeperatorLineAbout from './Components/SeperatorLineAbout';
import OurStory from './Components/OurStory';
import PeoplesChallenge from './Components/PeoplesChallenge';
import TheSolution from './Components/TheSolution';


export default function About(props) {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState(false);
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
                        userInfo={userInfo} />
                </div>
                <div className="col-right about">
                    <AboutHeader />
                    <Fade>
                        <SeperatorLineAbout label="Entrepreneur Advice" />
                        <EntrepreneurAdvice />
                        <SeperatorLineAbout label="Our Story" />
                        <OurStory />
                    </Fade>
                    <Fade>
                        <SeperatorLineAbout label="Problems are All Over Internet" />
                    </Fade>
                    <PeoplesChallenge />
                    <Fade delay={1000}>
                        <SeperatorLineAbout label="Here is Solution to Problem" />
                    </Fade>
                    <TheSolution />
                </div>
            </div>
        </>
    );
}