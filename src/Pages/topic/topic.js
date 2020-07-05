import React, { useState } from 'react';
import './Topic.css';
import gql from 'graphql-tag';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import Header from '../../Components/Header/Header';
import SeperatorLine from '../../Components/SeperatorLine';
import ExplainationBox from './Components/ExplanationBox';
import SectionPost from './Components/SectionPost';
import SectionChart from './Components/SectionChart';
import GoogleAnalytics from '../../Components/Helpers/GoogleAnalytics';

export default function Topic(props) {
    let topicId = parseInt(window.location.href.split("topics/")[1]);

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    const [topicPosts, setTopicPosts] = useState([]);
    const [subTopicPosts, setSubTopicPosts] = useState([]);
    const [countryPosts, setCountryPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const [topicName, setTopicName] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [chartType, setChartType] = useState('pie');
    const [selectedData, setSelectedData] = useState(null);
    const [displayBox, setDisplayBox] = useState('hide');

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

    const GET_TOPIC_STATS = gql`
        query topicStats ($topicId: ID!) {
            topicStats (topicId: $topicId) {
                topicName,
                weights{
                    subTopicWeights {
                        postCount, userPoint, sameHere
                    },
                    countryWeights {
                        postCount, sameHere
                    }
                }, 
                subTopicStats {
                    subTopicId, subTopicName, sameHereCount, userPoints, postCount
                },
                topicCountryStats {
                    countryId, countryName, postCount, sameHereCount
                }
            }
        }
    `;

    let postQuery = `
        id, description, 
        postedBy{
            id, firstName, lastName, profilePic, industry, occupation
        },
        created, industry, 
        location{
            countryId, countryName, stateId, stateName, cityId, cityName
        },
        subTopic{
            id, description, topicId, topicName
        },
        approved, sameHere, sameHered
    `;

    const GET_TOPIC_POSTS = gql`
        query posts ($count: Int!, $topicId: ID!){ 
            posts(count: $count, topicId: $topicId){
                ${postQuery}
            }
        }
    `;

    const GET_MORE_TOPIC_POSTS = gql`
        query posts ($count: Int!, $topicId: ID!, $lastDate: Float!){ 
            posts(count: $count, topicId: $topicId, lastDate: $lastDate){
                ${postQuery}
            }
        }
    `;

    const GET_SUBTOPIC_POSTS = gql`
        query posts ($count: Int!, $topicId: ID!, $subTopicId: ID!){ 
            posts(count: $count, topicId: $topicId, subTopicId: $subTopicId){
                ${postQuery}
            }
        }
    `;

    const GET_MORE_SUBTOPIC_POSTS = gql`
        query posts ($count: Int!, $topicId: ID!, $subTopicId: ID!, $lastDate: Float!){ 
            posts(count: $count, topicId: $topicId, subTopicId: $subTopicId, lastDate: $lastDate){
                ${postQuery}
            }
        }
    `;

    const GET_COUNTRY_POSTS = gql`
        query posts ($count: Int!, $topicId: ID!, $countryId: ID!){ 
            posts(count: $count, topicId: $topicId, countryId: $countryId){
                ${postQuery}
            }
        }
    `;

    const GET_MORE_COUNTRY_POSTS = gql`
        query posts ($count: Int!, $topicId: ID!, $countryId: ID!, $lastDate: Float!){ 
            posts(count: $count, topicId: $topicId, countryId: $countryId, lastDate: $lastDate){
                ${postQuery}
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
            setUserInfo(data && data.userProfile.user);
        }
    });

    useQuery(GET_TOPIC_STATS, {
        variables: {
            topicId: topicId
        },
        onCompleted: data => {
            setTopicName(data.topicStats.topicName);
            formatChartData(data.topicStats);

            GoogleAnalytics('/topic/' + data.topicStats.topicName, {});
        },
        onError: ({ graphQLErrors }) => {
            window.location.href = "/404";
        }
    });

    useQuery(GET_TOPIC_POSTS, {
        variables: {
            count: 10,
            topicId: topicId
        },
        onCompleted: data => {
            setTopicPosts(data.posts);
        }
    });

    const [getMoreTopicPosts] = useLazyQuery(GET_MORE_TOPIC_POSTS, {
        onCompleted: data => {
            let tmpArray = topicPosts.concat(data.posts);
            if (tmpArray.length === topicPosts.length) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
            setTopicPosts(tmpArray);
        }
    });

    const [getSubTopicPosts] = useLazyQuery(GET_SUBTOPIC_POSTS, {
        onCompleted: data => {
            setSubTopicPosts(data.posts);
        }
    });

    const [getMoreSubTopicPosts] = useLazyQuery(GET_MORE_SUBTOPIC_POSTS, {
        onCompleted: data => {
            let tmpArray = subTopicPosts.concat(data.posts);
            if (tmpArray.length === subTopicPosts.length) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
            setSubTopicPosts(tmpArray);
        }
    });

    const [getCountryPosts] = useLazyQuery(GET_COUNTRY_POSTS, {
        onCompleted: data => {
            setCountryPosts(data.posts);
        }
    });

    const [getMoreCountryPosts] = useLazyQuery(GET_MORE_COUNTRY_POSTS, {
        onCompleted: data => {
            let tmpArray = countryPosts.concat(data.posts);
            if (tmpArray.length === countryPosts.length) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
            setCountryPosts(tmpArray);
        }
    });

    function getMorePosts() {
        if (selectedData) {
            if (chartType === 'pie') {
                setTimeout(() => {
                    getMoreSubTopicPosts({
                        variables: {
                            count: 5,
                            topicId: topicId,
                            subTopicId: selectedData && selectedData.subtopicId,
                            lastDate: subTopicPosts.length && subTopicPosts[subTopicPosts.length - 1].created
                        }
                    });
                }, 400);
            } else if (chartType === 'map') {
                setTimeout(() => {
                    getMoreCountryPosts({
                        variables: {
                            count: 5,
                            topicId: topicId,
                            countryId: selectedData && selectedData.data.countryId,
                            lastDate: countryPosts.length && countryPosts[countryPosts.length - 1].created
                        }
                    });
                }, 400);
            }
        } else {
            setTimeout(() => {
                getMoreTopicPosts({
                    variables: {
                        count: 5,
                        topicId: topicId,
                        lastDate: topicPosts.length && topicPosts[topicPosts.length - 1].created
                    }
                });
            }, 400);
        }
    };

    function handleChartClick(data) {
        if (selectedData && selectedData.label === data.label) {
            setSelectedData(null);
            setDisplayBox('hide');
        } else {
            setSelectedData(data);
            setDisplayBox('show');

            if (chartType === 'pie') {
                getSubTopicPosts({
                    variables: {
                        count: 10,
                        topicId: topicId,
                        subTopicId: data && data.subtopicId
                    }
                });
                analytics("Topic Page Action", `Pie Chart clicked - ${data.label}`);
            } else if (chartType === 'map') {
                getCountryPosts({
                    variables: {
                        count: 10,
                        topicId: topicId,
                        countryId: data && data.data.countryId
                    }
                });
                analytics("Topic Page Action", `Map clicked - ${data.label}`);
            }
        }
        setHasMore(true);
    };

    function selectChartType(data) {
        setChartType(data);
        clearFilter();

        analytics("Topic Page Action", `Select Chart clicked - ${data}`);
    };

    function clearFilter() {
        setDisplayBox('hide');
        setSubTopicPosts([]);
        setCountryPosts([]);
        setHasMore(true);
        setSelectedData(null);
    };

    function formatChartData(data) {
        let formatedObj = {};
        let stWt = data.weights.subTopicWeights;
        let cntWt = data.weights.countryWeights;
        formatedObj["pie"] = data.subTopicStats.map((obj) => {
            return {
                id: obj.subTopicName,
                subtopicId: parseInt(obj.subTopicId),
                label: obj.subTopicName,
                value: Math.ceil((stWt.postCount * obj.postCount + stWt.sameHere * obj.sameHereCount + stWt.userPoint * obj.userPoints) / 5) * 5,
                postCount: obj.postCount,
                sameHereCount: obj.sameHereCount
            };
        });
        formatedObj["map"] = data.topicCountryStats.map((obj) => {
            return {
                id: obj.countryName,
                countryId: parseInt(obj.countryId),
                value: Math.ceil((cntWt.postCount * obj.postCount + cntWt.sameHere * obj.sameHereCount) / 5) * 5,
                postCount: obj.postCount,
                sameHereCount: obj.sameHereCount
            };
        });
        setChartData(formatedObj);
    };

    function analytics(category, action){
        let objGA={
            category: category,
            action: action
        };
        GoogleAnalytics('', objGA);
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
                <div id="main-TP" className="col-right main-TP">
                    <div className="main-header">Analytics for <span>{topicName}</span></div>
                    <SectionChart handleChartClick={handleChartClick}
                        selectChartType={selectChartType}
                        chartData={chartData} />

                    <ExplainationBox selectedData={selectedData}
                        type={chartType}
                        displayBox={displayBox} />

                    <SeperatorLine thisValue="Related posts" />

                    <SectionPost isSignedIn={isSignedIn}
                        clearFilter={clearFilter}
                        selectedData={selectedData}
                        posts={subTopicPosts.length > 0 ? subTopicPosts : (countryPosts.length > 0 ? countryPosts : topicPosts)}
                        hasMore={hasMore}
                        getMorePosts={getMorePosts} />
                </div>
            </div>
        </>
    );
}