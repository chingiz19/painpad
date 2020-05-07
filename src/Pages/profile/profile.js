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

export default function Profile(props) {
    let userId = parseInt(window.location.href.split("users/")[1]);

    const [isSelf, setIsSelf] = useState('');
    const [sepLineValue, setSepLineValue] = useState('');

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

    const {data: dataGetUserInfo}  = useQuery(GET_USER_INFO, {
        variables: {
            userId: userId
        },
        onCompleted: data => {
            setIsSelf(dataGetUserInfo.userProfile.self);
            if(dataGetUserInfo.userProfile.self){
                setSepLineValue('My reports');
            } else{
                const tmpValue = data.userProfile.user.firstName + "'s reports"
                setSepLineValue(tmpValue);
            }
        }
    });

    const {data: isUserSignedIn} = useQuery(IS_USER_SIGNED_IN)

    let posts_tmp = [{
        poster: {
            firstName: "Elnar",
            lastName: "Sharifli",
            profilePic: "../images/users/profile-pictures/elnarsharifli.jpg",
            industry: "Investment Management",
            profileImg: "https://www.telegraph.co.uk/content/dam/technology/2017/11/01/emoji_update_2017_1_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.png?imwidth=450"
        },
        problem: {
            id: "123423",
            topic_id: "121a81ua",
            body: "Phone charger cable not being able to reach your bed. You may rearrange bed, or lie on floor, so you can scroll through Facebook or some other website.",
            same_here_count: 8,
            problem_what: "parking",
            location: "Calgary, CAD"
        }
    },
    {
        poster: {
            firstName: "Elnar",
            lastName: "Sharifli",
            profilePic: "../images/users/profile-pictures/elnarsharifli.jpg",
            industry: "Investment Management",
            profileImg: "https://www.telegraph.co.uk/content/dam/technology/2017/11/01/emoji_update_2017_1_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.png?imwidth=450"
        },
        problem: {
            id: "225",
            topic_id: "312b81uc",
            body: "Having to give your friends your WiFi code. Made even worse when one of your friends isn't listening or arrives late, and you have to give it out again.",
            same_here_count: 23,
            problem_what: "wi-fi",
            location: "Vancouver, CAD"
        }
    }
    ];

    return (
        <>
            <Container className="view-port">
                <Container fluid="lg">
                    <Row>
                        <Col sm={4} md={3} className="header-comp">
                            <HeaderWeb currentPage={props.pageName} 
                                isUserSignedIn={isUserSignedIn} 
                                isSelf={isSelf}/>
                        </Col>
                        <Col sm={8} md={9} className="main-comp">
                            <div className="div-1">
                                <ProfileUserInfo isUserSignedIn={isUserSignedIn}/>
                                <SeperatorLine thisValue={sepLineValue} />
                                <ProblemFeed thisPosts={posts_tmp} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}