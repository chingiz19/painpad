import React, { useState } from 'react';
import './Profile.css';
import gql from 'graphql-tag';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import InfiniteScroll from 'react-infinite-scroll-component';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderWeb from '../../Components/HeaderWeb';
import ProfileUserInfo from '../../Components/ProfileUserInfo';
import ProblemFeed from '../../Components/ProblemFeed';
import SeperatorLine from '../../Components/SeperatorLine';
import DynamicIcon from '../../Components/Helpers/DynamicIcon';

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

    const GET_USER_POSTS = gql`
        query posts ($userId: ID!, $count: Int!) { 
            posts(userId: $userId, count: $count) {
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
                created, industry, location
                }
        }
    `;

    const GET_MORE_POSTS = gql`
        query posts($lastDate: Float!, $count: Int!){ 
            posts(lastDate: $lastDate, count: $count) {
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
                setSepLineValue('My reports');
                setPageTitle('My profile');
            } else {
                setSepLineValue(data.userProfile.user.firstName + "'s reports");
                setPageTitle(data.userProfile.user.firstName + "'s profile");
            }
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
    }

    function handleLoadMore() {
        setTimeout(() => {
            getMorePosts({
                variables: {
                    count: 5,
                    lastDate: allUserPosts && allUserPosts[allUserPosts.length - 1].created
                }
            });
        }, 800);
    }

    return (
        <>
            <Container className="view-port ">
                <Container fluid="lg">
                    <Row>
                        <Col sm={4} md={3} className="header-comp">
                            <HeaderWeb currentPage={props.pageName}
                                pageTitle={pageTitle}
                                isSignedIn={isSignedIn}
                                userId={userId}
                                isSelf={userInfo && userInfo.self} />
                        </Col>
                        <Col sm={8} md={9} className="main-comp comp-profile">
                            <div id="mp-problem" className="div-mp-problem">
                                <ProfileUserInfo isSignedIn={isSignedIn}
                                    userId={userId} />
                                <SeperatorLine thisValue={sepLineValue} />
                                <div className="div-posts">
                                    <button className={dataGetPosts && dataGetPosts.posts.length && userInfo && userInfo.self ? 'btn-user-prof posts-edit-btn' : 'none'}
                                        onClick={handleEditPosts}>{editPosts ? 'Cancel' : 'Edit'}</button>
                                    <InfiniteScroll
                                        scrollableTarget="mp-problem"
                                        scrollThreshold={1}
                                        dataLength={allUserPosts.length}
                                        next={handleLoadMore}
                                        hasMore={hasMore}
                                        loader={
                                            (allUserPosts.length > 0 && <DynamicIcon type='loading' width={80} height={80} />)
                                        }
                                        endMessage={
                                            <div className="end-message">Yay! You have seen it all</div>
                                        }>
                                        <ProblemFeed filter={false}
                                            thisPosts={allUserPosts || []}
                                            editPosts={editPosts}
                                            firstName={userInfo && userInfo.user.firstName}
                                            isLogin={isSignedIn}
                                            showEmpty={true} />
                                    </InfiniteScroll>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}