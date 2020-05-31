import React, { useState } from 'react';
import './Post.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderWeb from '../../Components/HeaderWeb'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Problem from '../../Components/reactMaps/Problem';
import PostRejected from './Components/PostRejected';

export default function Post(props) {
    const isRejected = new URLSearchParams(props.location.search).get("rejected") && true;
    const postId = parseInt(props.match.params.postId);

    const [rejectedPost, setRejectedPost] = useState(null);
    const [post, setPost] = useState(null);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState(false);

    const IS_USER_SIGNED_IN = gql`
        query isLogin{
            isLogin {success, id}
        }
    `;

    const GET_THE_POST = gql`
        query posts($postId: ID!) { 
            posts(postId: $postId) {
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

    const GET_REJECTED_POST = gql`
        query rejectedPost($rejectedPostId: ID!) {
            rejectedPost(rejectedPostId: $rejectedPostId){
            id, description, postedBy{
                id, firstName, lastName, profilePic, industry, occupation
            },
            created, industry, location, rejected, rejectedBy{
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
        }
    });

    useQuery(isRejected ? GET_REJECTED_POST : GET_THE_POST, {
        variables: isRejected ? { rejectedPostId: postId } : { postId: postId },
        onCompleted: data => {
            if (isRejected) {
                setRejectedPost(data.rejectedPost);
            } else {
                setPost(data.posts[0]);
            }
        }
    });

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
                        <Col sm={8} md={9} className="main-comp main-post">
                            <div className="main-header">Post page</div>
                            <div className="main main-post">
                                {
                                    isRejected
                                        ?
                                        <PostRejected problemObj={rejectedPost} />
                                        :
                                        <Problem problemObj={post} editPosts={false} isLogin={isSignedIn} />
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}