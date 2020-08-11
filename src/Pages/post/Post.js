import React, { useState } from 'react';
import './Post.css';
import Header from '../../Components/Header/Header';
import gql from 'graphql-tag';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import Problem from '../../Components/reactMaps/Problem';
import PostRejected from './Components/PostRejected';
import GoogleAnalytics from '../../Components/Helpers/GoogleAnalytics';

export default function Post(props) {
    const isRejected = new URLSearchParams(props.location.search).get("rejected") && true;
    const postId = parseInt(props.match.params.postId);

    const [rejectedPost, setRejectedPost] = useState(null);
    const [post, setPost] = useState(null);
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

    const GET_THE_POST = gql`
        query posts($postId: ID!) { 
            posts(postId: $postId) {
                id, description, 
                postedBy{
                    id, firstName, lastName, profilePic, industry, occupation
                },
                created, 
                location{
                    countryId, countryName, stateId, stateName, cityId, cityName
                },
                subTopic{
                    id, description, topicId, topicName
                },
                approved, sameHere, sameHered
            }
        }
    `;

    const GET_REJECTED_POST = gql`
        query rejectedPost($rejectedPostId: ID!) {
            rejectedPost(rejectedPostId: $rejectedPostId){
                id, description, postedBy{
                    id, firstName, lastName, profilePic, industry, occupation
                },
                created, location, rejected, rejectedBy{
                    id, firstName, lastName, profilePic, industry, occupation
                },
                reason, explanation, suggestion
            }
        }
    `;

    useQuery(IS_USER_SIGNED_IN, {
        onCompleted: data => {
            setUserId(data.isLogin.id);
            setIsSignedIn(data.isLogin.success);
            getUserInfo();

            GoogleAnalytics('/posts/' + postId + (isRejected ? ' - Rejected' : ''), {});
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

    useQuery(isRejected ? GET_REJECTED_POST : GET_THE_POST, {
        variables: isRejected ? { rejectedPostId: postId } : { postId: postId },
        onCompleted: data => {
            if (isRejected) {
                setRejectedPost(data.rejectedPost);
            } else {
                if (data.posts.length > 0) {
                    setPost(data.posts[0]);
                } else {
                    window.location.href = "/404";
                }
            }
        },
        onError: ({ graphQLErrors }) => {
            window.location.href = "/404";
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
                <div className="col-right main-post">
                    <div className="main-header">Post page</div>
                    <div className="main main-post">
                        {
                            isRejected
                                ?
                                <PostRejected problemObj={rejectedPost} />
                                :
                                <Problem problemObj={post} editPosts={false} isLogin={isSignedIn} origin="Post Page"/>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}