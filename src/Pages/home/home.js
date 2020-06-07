import React, { useState } from 'react';
import './Home.css';
import gql from 'graphql-tag';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import InfiniteScroll from 'react-infinite-scroll-component';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderWeb from '../../Components/HeaderWeb';
import WriteReport from '../../Components/WriteReport';
import ProblemFeed from '../../Components/ProblemFeed';
import SeperatorLine from '../../Components/SeperatorLine';
import PostExplaination from './Components/PostExplaination';
import DynamicIcon from '../../Components/Helpers/DynamicIcon';

export default function Home(props) {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState(false);
    const [feedPosts, setFeedPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const IS_USER_SIGNED_IN = gql`
        query isLogin{
            isLogin {success, id}
        }
    `;

    const GET_POSTS = gql`
        query posts($count: Int!){ 
            posts(count: $count) {
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

    useQuery(IS_USER_SIGNED_IN, {
        onCompleted: data => {
            setUserId(data.isLogin.id);
            setIsSignedIn(data.isLogin.success);
        }
    });

    useQuery(GET_POSTS, {
        variables: {
            count: 10
        },
        onCompleted: data => {
            setFeedPosts(data.posts);
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
            <Container className="view-port">
                <Container fluid="lg">
                    <Row>
                        <Col sm={4} md={3} className="header-comp">
                            <HeaderWeb currentPage={props.pageName}
                                isSignedIn={isSignedIn}
                                userId={userId} />
                        </Col>
                        <Col sm={8} md={9} className="main-comp">
                            <div id="main-problems" className="problems-div">
                                <PostExplaination />
                                <WriteReport isLogin={isSignedIn} />
                                <SeperatorLine thisValue="Reports feed" />
                                <InfiniteScroll
                                    scrollableTarget="main-problems"
                                    scrollThreshold={1}
                                    dataLength={feedPosts.length}
                                    next={handleLoadMore}
                                    hasMore={hasMore}
                                    loader={
                                        (feedPosts.length > 0 && <DynamicIcon type='loading' width={80} height={80} />)
                                    }
                                    endMessage={
                                        <div className="end-message">Yay! You have seen it all</div>
                                    }>
                                    <ProblemFeed filter={false}
                                        thisPosts={feedPosts}
                                        isLogin={isSignedIn}
                                        showEmpty={false} />
                                </InfiniteScroll>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}