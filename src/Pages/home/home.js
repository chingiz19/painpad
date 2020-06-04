import React, {useState} from 'react';
import './Home.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import HeaderWeb from '../../Components/HeaderWeb';
import WriteReport from '../../Components/WriteReport';
import ProblemFeed from '../../Components/ProblemFeed';
import SeperatorLine from '../../Components/SeperatorLine';
import PostExplaination from './Components/PostExplaination';

export default function Home(props) {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState(false);

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

    useQuery(IS_USER_SIGNED_IN, {
        onCompleted: data =>{
            setUserId(data.isLogin.id);
            setIsSignedIn(data.isLogin.success);
        }
    });

    const { data: dataGetPosts } = useQuery(GET_POSTS);

    return (
        <>
            <Container className="view-port">
                <Container fluid="lg">
                    <Row>
                        <Col sm={4} md={3} className="header-comp">
                            <HeaderWeb currentPage={props.pageName}
                                isSignedIn={isSignedIn} 
                                userId={userId}/>
                        </Col>
                        <Col sm={8} md={9} className="main-comp">
                            <div className="main">
                                <div className="problems-div">
                                    <PostExplaination/>
                                    <WriteReport isLogin={isSignedIn}/>
                                    <SeperatorLine thisValue="Reports feed" />
                                    <ProblemFeed filter={false} 
                                        thisPosts={(dataGetPosts && dataGetPosts.posts) || []} 
                                        isLogin={isSignedIn}/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}