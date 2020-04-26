import React from 'react';
import './Home.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HeaderWeb from '../../Components/HeaderWeb'
import WriteReport from '../../Components/WriteReport';
import ProblemFeed from '../../Components/ProblemFeed'

export default function Home(props) {

    let posts_tmp = [{
        poster: {
            firstName: "Elnar",
            lastName: "Sharifli",
            profilePic: "../images/users/profile-pictures/elnarsharifli.jpg",
            industry: "Investment Management"
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
            industry: "Investment Management"
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
                            <HeaderWeb currentPage={props.pageName} />
                        </Col>
                        <Col sm={8} md={9} className="main-comp">
                            <div className="main">
                                <div className="problems-div">
                                    <WriteReport />
                                    <div className="wr-feed-seperator"></div>
                                    <ProblemFeed thisPosts={posts_tmp}/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}