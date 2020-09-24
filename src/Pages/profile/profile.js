import React, { useState } from 'react';
import './Profile.css';
import gql from 'graphql-tag';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import Header from '../../Components/Header/Header';
import ProfileUserInfo from './Components/ProfileUserInfo';
import GoogleAnalytics from '../../Components/Helpers/GoogleAnalytics';
import PostSection from './Components/PostSection';
import SolutionSection from './Components/SolutionSection';

export default function Profile(props) {
    let profileUserId = parseInt(window.location.href.split("users/")[1]);

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState(false);
    const [feedType, setFeedType] = useState('posts');
    const [pageTitle, setPageTitle] = useState('PainPad | Profile');

    const [userInfo, setUserInfo] = useState();
    const [allUserPosts, setAllUserPosts] = useState([]);
    const [allSols, setAllSols] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const IS_SIGNED_IN = gql`
        query isLogin{
            isLogin {success, id}
        }
    `;

    const GET_USER_INFO = gql`
        query userProfile($userId: ID!) {
            userProfile(userId: $userId) {
                self, user{
                    id, firstName, lastName, email, emailVerified, profilePic, 
                    occupation {
                        occupationId: id, occupation: value
                    }, 
                    industry {
                        industryId: id, industry: value
                    }, 
                    location {
                        locationId: id, location: value
                    }, 
                    since, score 
                }
            }
        }
    `;

    let postQuery = `
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
        approved, sameHere, sameHered, solutionCnt
    `;

    const GET_USER_POSTS = gql`
        query posts ($userId: ID!, $count: Int!) { 
            posts(userId: $userId, count: $count) {
                ${postQuery}
            }
        }
    `;

    const GET_MORE_POSTS = gql`
        query posts($userId: ID!, $lastDate: Float!, $count: Int!){ 
            posts(userId: $userId, lastDate: $lastDate, count: $count) {
                ${postQuery}
            }
        }
    `;

    const GET_USER_PENDING_POSTS = gql`
        query userPendingPosts { 
            userPendingPosts {
                id, description, 
                postedBy{
                    id, firstName, lastName, profilePic, industry, occupation
                }, 
                created, location
                }
        }
    `;

    const GET_USER_SOLUTIONS = gql`
        query solutions($userId: ID!){
            solutions(userId: $userId){
                id, logo, name, website, description, likesCnt, liked, created,
                postedBy{
                    id, firstName, lastName, profilePic, industry, occupation
                }
            }
        }
    `;

    useQuery(IS_SIGNED_IN, {
        onCompleted: data => {
            setUserId(data.isLogin.id);
            setIsSignedIn(data.isLogin.success);
            getPosts({
                variables: {
                    userId: profileUserId,
                    count: 10
                }
            });
            getSolutions({
                variables: {
                    userId: profileUserId
                }
            });
        }
    });

    useQuery(GET_USER_INFO, {
        fetchPolicy: 'network-only',
        variables: {
            userId: profileUserId
        },
        onCompleted: data => {
            setUserInfo(data.userProfile);
            if (data.userProfile.self) {
                setPageTitle('My profile');
            } else {
                setPageTitle(data.userProfile.user.firstName + "'s profile");
            }

            GoogleAnalytics('/users/' + profileUserId + (data.userProfile.self ? '- self' : ''), {});
        }
    });

    const [getPosts, { data: dataGetPosts }] = useLazyQuery(GET_USER_POSTS, {
        onCompleted: data => {
            if (userInfo && userInfo.self) {
                getPendingPosts({});
            } else {
                setAllUserPosts(data.posts);
            }
        }
    });

    const [getSolutions] = useLazyQuery(GET_USER_SOLUTIONS, {
        onCompleted: data => {
            setAllSols(data.solutions);
        }
    });

    const [getPendingPosts] = useLazyQuery(GET_USER_PENDING_POSTS, {
        onCompleted: data => {
            let tmpAllPosts = [];
            let tmpUserPosts = dataGetPosts ? dataGetPosts.posts : [];
            if (data.userPendingPosts.length > 0) {
                tmpAllPosts = data.userPendingPosts.concat(tmpUserPosts);
            } else {
                tmpAllPosts = tmpUserPosts;
            }
            setAllUserPosts(tmpAllPosts);
        }
    });

    const [getMorePosts] = useLazyQuery(GET_MORE_POSTS, {
        onCompleted: data => {
            let tmpArray = allUserPosts.concat(data.posts);
            if (tmpArray.length === allUserPosts.length) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
            setAllUserPosts(tmpArray);
        }
    });

    function handleLoadMore() {
        setTimeout(() => {
            getMorePosts({
                variables: {
                    userId: profileUserId,
                    count: 5,
                    lastDate: allUserPosts.length && allUserPosts[allUserPosts.length - 1].created
                }
            });
        }, 800);
    }

    function selectFeedType(value) {
        setFeedType(value);
    }

    return (
        <>
            <div className="div-main">
                <div className="col-left">
                    <Header currentPage={props.pageName}
                        pageTitle={pageTitle}
                        isSelf={userInfo && userInfo.self}
                        isSignedIn={isSignedIn}
                        userId={userId}
                        userInfo={userInfo && userInfo.user} />
                </div>
                <div id="mp-problem" className="col-right comp-profile">
                    <div className="main-header profile">Profile</div>
                    <ProfileUserInfo isSignedIn={isSignedIn}
                        userId={userId} />
                    <div className="SP-switch">
                        <div className="line"></div>
                        <div className="btns">
                            <button className={feedType === 'posts' ? 'selected left' : 'not-selected'} onClick={() => selectFeedType('posts')}>Problems</button>
                            <button className={feedType === 'sols' ? 'selected right' : 'not-selected'} onClick={() => selectFeedType('sols')}>Solutions</button>
                        </div>
                    </div>

                    <div className="div-posts">
                        {
                            feedType === 'posts'
                                ? <PostSection handleLoadMore={handleLoadMore}
                                    userInfo={userInfo}
                                    isLogin={isSignedIn}
                                    allUserPosts={allUserPosts}
                                    hasMore={hasMore} />
                                : <SolutionSection userInfo={userInfo}
                                    isLogin={isSignedIn}
                                    solutions={allSols} />
                        }
                    </div>
                </div>
            </div>
        </>
    );
}