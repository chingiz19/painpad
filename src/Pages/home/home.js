import React, { useState } from 'react';
import './Home.css';
import gql from 'graphql-tag';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from '../../Components/Header/Header';
import ProblemFeed from '../../Components/ProblemFeed';
import SeperatorLine from '../../Components/SeperatorLine';
import WritePost from './Components/WritePost';
import DynamicIcon from '../../Components/Helpers/DynamicIcon';
import GoogleAnalytics from '../../Components/Helpers/GoogleAnalytics';

export default function Home(props) {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [feedPosts, setFeedPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

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

    const GET_POSTS = gql`
        query posts($count: Int!){ 
            posts(count: $count) {
                ${postQuery}
            }
        }
    `;

    const GET_MORE_POSTS = gql`
        query posts($lastDate: Float!, $count: Int!){ 
            posts(lastDate: $lastDate, count: $count) {
                ${postQuery}
            }
        }
    `;

    useQuery(IS_USER_SIGNED_IN, {
        onCompleted: data => {
            setUserId(data.isLogin.id);
            setIsSignedIn(data.isLogin.success);
            getUserInfo();

            GoogleAnalytics('/home', {});
        }
    });

    const { loading: loadingGetPosts } = useQuery(GET_POSTS, {
        fetchPolicy: 'network-only',
        variables: {
            count: 10
        },
        onCompleted: data => {
            setFeedPosts(data.posts);
        }
    });

    const [getUserInfo] = useLazyQuery(GET_USER_INFO, {
        fetchPolicy: 'network-only',
        variables: {
            userId: parseInt(userId)
        },
        onCompleted: data => {
            setUserInfo(data && data.userProfile.user);
        }
    });

    const [callGetMorePosts] = useLazyQuery(GET_MORE_POSTS, {
        onCompleted: data => {
            let tmpArray = feedPosts.concat(data.posts);
            if (tmpArray.length === feedPosts.length) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
            setFeedPosts(tmpArray);
        }
    });

    function handleLoadMore() {
        setTimeout(() => {
            callGetMorePosts({
                variables: {
                    count: 5,
                    lastDate: feedPosts && feedPosts[feedPosts.length - 1].created
                }
            });
        }, 800);
    }

    return (
        <>
            <div className="div-main">
                <div className="col-left">
                    <Header currentPage={props.pageName}
                        isSignedIn={isSignedIn}
                        userId={userId} 
                        userInfo={userInfo}/>
                </div>
                <div id="main-problems" className="col-right problems-div">
                    <WritePost isLogin={isSignedIn}
                        userId={userId}
                        userInfo={userInfo}/>
                    <SeperatorLine thisValue="Shared Pains" />
                    <InfiniteScroll
                        scrollableTarget="main-problems"
                        scrollThreshold={1}
                        dataLength={feedPosts.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={
                            ((feedPosts.length > 2 || loadingGetPosts) && <DynamicIcon type='loading' width={80} height={80} />)
                        }
                        endMessage={
                            <div className="end-message">Yay! You've seen it all.</div>
                        }>
                        <ProblemFeed thisPosts={feedPosts}
                            isLogin={isSignedIn}
                            showEmpty={false} 
                            origin="Home"/>
                    </InfiniteScroll>
                </div>
            </div>
        </>
    );
}