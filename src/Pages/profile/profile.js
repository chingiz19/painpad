import React, { useState } from 'react';
import './Profile.css';
import gql from 'graphql-tag';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from '../../Components/Header/Header';
import ProfileUserInfo from './Components/ProfileUserInfo';
import ProblemFeed from '../../Components/ProblemFeed';
import SeperatorLine from '../../Components/SeperatorLine';
import DynamicIcon from '../../Components/Helpers/DynamicIcon';
import GoogleAnalytics from '../../Components/Helpers/GoogleAnalytics';

export default function Profile(props) {
    let profileUserId = parseInt(window.location.href.split("users/")[1]);

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState(false);
    const [sepLineValue, setSepLineValue] = useState('');
    const [pageTitle, setPageTitle] = useState('PainPad | Profile');
    const [editPosts, setEditPosts] = useState(false);

    const [userInfo, setUserInfo] = useState();
    const [allUserPosts, setAllUserPosts] = useState([]);
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
        approved, sameHere, sameHered
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
        }
    });

    useQuery(GET_USER_INFO, {
        variables: {
            userId: profileUserId
        },
        onCompleted: data => {
            setUserInfo(data.userProfile);
            if (data.userProfile.self) {
                setSepLineValue('My Reports');
                setPageTitle('My profile');
            } else {
                setSepLineValue(data.userProfile.user.firstName + "'s reports");
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

    const handleEditPosts = () => {
        setEditPosts(!editPosts);

        let obj={
            category: "User Account",
            action: `${editPosts ? 'Cancel Edit' : 'Edit'} Posts clicked`
        };
        GoogleAnalytics('', obj);
    }

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

                <div className="main-header">Profile</div>

                    <ProfileUserInfo isSignedIn={isSignedIn}
                        userId={userId} />
                    <SeperatorLine thisValue={sepLineValue} />
                    <div className="div-posts">
                        <button className={allUserPosts && allUserPosts.length && userInfo && userInfo.self ? 'btn-user-prof posts-edit-btn' : 'none'}
                            onClick={handleEditPosts}>{editPosts ? 'Cancel' : 'Edit'}</button>
                        <InfiniteScroll
                            scrollableTarget="mp-problem"
                            scrollThreshold={1}
                            dataLength={allUserPosts.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={
                                (allUserPosts.length > 4 && <DynamicIcon type='loading' width={80} height={80} />)
                            }
                            endMessage={
                                (allUserPosts.length > 0 && <div className="end-message">Yay! You've seen it all.</div>)
                            }>
                            <ProblemFeed filter={false}
                                // thisPosts={allUserPosts || []}
                                thisPosts={[]}
                                editPosts={editPosts}
                                firstName={userInfo && userInfo.user.firstName}
                                isLogin={isSignedIn}
                                showEmpty={true} 
                                origin="Profile"/>
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </>
    );
}