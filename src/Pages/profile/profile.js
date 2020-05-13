import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
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

export default function Profile(props) {
    let userId = parseInt(window.location.href.split("users/")[1]);

    const [isSelf, setIsSelf] = useState('');
    const [sepLineValue, setSepLineValue] = useState('');
    const [pageTitle, setPageTitle] = useState('PainPad | Profile');
    const [editPosts, setEditPosts] = useState(false);

    const IS_USER_SIGNED_IN = gql`
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
        query userPosts ($userId: ID!){ 
            userPosts (userId: $userId){
                id, description, 
                postedBy{
                    id, firstName, lastName, profilePic, industry, occupation
                }, 
                created, industry, location, approved, topic{
                    id, name
                },
                sameHere,
                sameHered
                }
        }
    `;

    const { data: dataGetUserInfo } = useQuery(GET_USER_INFO, {
        variables: {
            userId: userId
        },
        onCompleted: data => {
            setIsSelf(dataGetUserInfo.userProfile.self);
            setPageTitle( data.userProfile.user.firstName + "'s profile");
            if (dataGetUserInfo.userProfile.self) {
                setSepLineValue('My reports');
            } else {
                setSepLineValue(data.userProfile.user.firstName + "'s reports");
            }
        }
    });

    const { data: isUserSignedIn } = useQuery(IS_USER_SIGNED_IN);

    const { data: dataGetUserPosts } = useQuery(GET_USER_POSTS, {
        variables: {
            userId: userId
        }
    });

    const handleEditPosts = () => {
        setEditPosts(!editPosts);
    }

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>
            <Container className="view-port ">
                <Container fluid="lg">
                    <Row>
                        <Col sm={4} md={3} className="header-comp">
                            <HeaderWeb currentPage={props.pageName}
                                isUserSignedIn={isUserSignedIn}
                                isSelf={isSelf} />
                        </Col>
                        <Col sm={8} md={9} className="main-comp comp-profile">
                            <div className="div-1">
                                <ProfileUserInfo isUserSignedIn={isUserSignedIn} />
                                <SeperatorLine thisValue={sepLineValue} />
                                <div className="div-posts">
                                    <button className={dataGetUserPosts && isSelf ? 'btn-user-prof posts-edit-btn' : 'none'} 
                                        onClick={handleEditPosts}>{editPosts ? 'Cancel' : 'Edit'}</button>
                                    <ProblemFeed thisPosts={(dataGetUserPosts && dataGetUserPosts.userPosts) || []} editPosts={editPosts} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}