import React, { useState } from 'react';
import './Profile.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HeaderWeb from '../../Components/HeaderWeb'
import ProfileUserInfo from '../../Components/ProfileUserInfo'
import ProblemFeed from '../../Components/ProblemFeed'
import SeperatorLine from '../../Components/SeperatorLine'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useLazyQuery } from '@apollo/react-hooks';

export default function Profile(props) {
    let profileUserId = parseInt(window.location.href.split("users/")[1]);

    const [isSelf, setIsSelf] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState(false);
    const [sepLineValue, setSepLineValue] = useState('');
    const [pageTitle, setPageTitle] = useState('PainPad | Profile');
    const [editPosts, setEditPosts] = useState(false);

    const [allUserPosts, setAllUserPosts] = useState([]);

    const IS_SIGNED_IN = gql`
        query isLogin{
            isLogin {success, id}
        }
    `;

    const GET_USER_INFO = gql`
        query userProfile($userId: ID!){
            userProfile(userId: $userId) {
            self, user{
                id, firstName, lastName, email, emailVerified, profilePic, 
                occupation {occupationId: id, occupation: value}, 
                industry {industryId: id, industry: value}, 
                location {locationId: id, location: value}, 
                since, score 
            }
            }
        }
    `;

    const GET_USER_POSTS = gql`
        query posts ($userId: ID!){ 
            posts(userId: $userId){
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

    const { data: dataGetUserInfo } = useQuery(GET_USER_INFO, {
        variables: {
            userId: profileUserId
        },
        onCompleted: data => {
            setIsSelf(dataGetUserInfo.userProfile.self);
            if (dataGetUserInfo.userProfile.self) {
                setSepLineValue('My reports');
                setPageTitle('My profile');
            } else {
                setSepLineValue(data.userProfile.user.firstName + "'s reports");
                setPageTitle(data.userProfile.user.firstName + "'s profile");
            }
        }
    });

    useQuery(IS_SIGNED_IN, {
        onCompleted: data => {
            setUserId(data.isLogin.id);
            setIsSignedIn(data.isLogin.success);
            callGetUserPosts({
                variables: {
                    userId: profileUserId
                }
            });
        }
    });

    const [callGetUserPosts, { data: dataGetPosts }] = useLazyQuery(GET_USER_POSTS, {
        onCompleted: data => {
            if (isSelf) {
                callGetUserPendingPosts({});
            } else {
                setAllUserPosts(data ? data.posts : []);
            }
        }
    });

    const [callGetUserPendingPosts] = useLazyQuery(GET_USER_PENDING_POSTS, {
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

    const handleEditPosts = () => {
        setEditPosts(!editPosts);
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
                                isSelf={isSelf}/>
                        </Col>
                        <Col sm={8} md={9} className="main-comp comp-profile">
                            <div className="div-1">
                                <ProfileUserInfo isSignedIn={isSignedIn} 
                                    userId={userId}/>
                                <SeperatorLine thisValue={sepLineValue} />
                                <div className="div-posts">
                                    <button className={dataGetPosts && dataGetPosts.posts.length && isSelf ? 'btn-user-prof posts-edit-btn' : 'none'}
                                        onClick={handleEditPosts}>{editPosts ? 'Cancel' : 'Edit'}</button>
                                    <ProblemFeed filter={false}
                                        thisPosts={allUserPosts || []}
                                        editPosts={editPosts}
                                        firstName={dataGetUserInfo && dataGetUserInfo.userProfile.user.firstName}
                                        isLogin={isSignedIn} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}