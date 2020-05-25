import React from 'react';
import { Helmet } from 'react-helmet'
import './Home.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HeaderWeb from '../../Components/HeaderWeb'
import WriteReport from '../../Components/WriteReport';
import ProblemFeed from '../../Components/ProblemFeed'
import SeperatorLine from '../../Components/SeperatorLine'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

export default function Home(props) {

    const IS_USER_SIGNED_IN = gql`
        query isLogin{
            isLogin {success, id}
        }
    `;

    const GET_POSTS = gql`
        query posts{ 
            posts{
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

    const { data: isSignedIn } = useQuery(IS_USER_SIGNED_IN);

    const { data: dataGetPosts } = useQuery(GET_POSTS);

    console.log("dataGetPosts ", dataGetPosts);

    return (
        <>
            <Helmet>
                <title>PainPad | Home</title>
            </Helmet>
            <Container className="view-port">
                <Container fluid="lg">
                    <Row>
                        <Col sm={4} md={3} className="header-comp">
                            <HeaderWeb currentPage={props.pageName} isSignedIn={isSignedIn} />
                        </Col>
                        <Col sm={8} md={9} className="main-comp">
                            <div className="main">
                                <div className="problems-div">
                                    <WriteReport/>
                                    <SeperatorLine thisValue="Reports feed" />
                                    <ProblemFeed filter={false} 
                                        thisPosts={(dataGetPosts && dataGetPosts.posts) || []} 
                                        isLogin={isSignedIn ? isSignedIn.isLogin.success : false}/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}