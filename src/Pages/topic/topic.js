import React from 'react'
import { Helmet } from 'react-helmet';
import './Topic.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HeaderWeb from '../../Components/HeaderWeb'
import { Pie } from 'react-chartjs-2';
import SeperatorLine from '../../Components/SeperatorLine';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ProblemFeed from '../../Components/ProblemFeed'

export default function Topic(props) {

    const IS_USER_SIGNED_IN = gql`
        query isLogin{
            isLogin {success, id}
        }
    `;

    const { data: isUserSignedIn } = useQuery(IS_USER_SIGNED_IN);

    const reports = {
        "userFeed": [
            {
                "id": "20",
                "description": "Phone charger cable not being able to reach your bed. You may rearrange bed, or lie on floor, so you can scroll through Facebook or some other website.",
                "postedBy": {
                    "id": "1",
                    "firstName": "Elnar",
                    "lastName": "Sharifli",
                    "profilePic": "https://painpad-profile-pictures.s3.amazonaws.com/painpad_default",
                    "industry": "Investment Management",
                    "occupation": null
                },
                "created": 1589095042859.294,
                "industry": "Dentistry",
                "location": "Calgary, Canada",
                "approved": 1589095297509.958,
                "topic": {
                    "id": "1",
                    "name": "Parking"
                },
                "sameHere": 0,
                "sameHered": false
            },
            {
                "id": "19",
                "description": "Having to give your friends your WiFi code. Made even worse when one of your friends isn't listening or arrives late, and you have to give it out again.",
                "postedBy": {
                    "id": "1",
                    "firstName": "Elnar",
                    "lastName": "Sharifli",
                    "profilePic": "https://painpad-profile-pictures.s3.amazonaws.com/painpad_default",
                    "industry": "Investment Management",
                    "occupation": null
                },
                "created": 1589092585500.736,
                "industry": "Real Esate",
                "location": "Calgary, Canada",
                "approved": 1589095297509.958,
                "topic": {
                    "id": "1",
                    "name": "Parking"
                },
                "sameHere": 1,
                "sameHered": true
            }]
    };

    let topic_obj = {
        header: "Wi-Fi",
        stats: {
            popularity: {
                reports_cnt: 21,
                endorsement: 218
            },
            pie_chart: {
                labels: [
                    'Connection',
                    'Accessibility',
                    'Code reshare'
                ],
                datasets: [{
                    data: [10, 20, 30],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }]
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>PainPad | Topic</title>
            </Helmet>
            <Container className="view-port">
                <Container fluid="lg">
                    <Row>
                        <Col sm={4} md={3} className="header-comp">
                            <HeaderWeb currentPage={props.pageName} isUserSignedIn={isUserSignedIn} />
                        </Col>
                        <Col sm={8} md={9} className="main-comp">
                            <div className="main-topic-page">
                                <div className="main-header">{topic_obj.header + ' - Topic Page'}</div>
                                <div className="pie-stats">
                                    <Pie data={topic_obj.stats.pie_chart} />
                                    <div className="stats-div">
                                        <div>
                                            <span className="number">{topic_obj.stats.popularity.reports_cnt}</span>
                                            <span className="txt"> topic posts</span>
                                        </div>
                                        <div>
                                            <span className="number">{topic_obj.stats.popularity.endorsement}</span>
                                            <span className="txt"> endorsements</span>
                                        </div>
                                    </div>
                                </div>
                                <SeperatorLine thisValue="Topic posts" />
                                <ProblemFeed thisPosts={reports} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}