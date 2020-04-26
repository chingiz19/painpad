import React from 'react'
import './Topic.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HeaderWeb from '../../Components/HeaderWeb'
import { Pie } from 'react-chartjs-2';
import SeperatorLine from '../../Components/SeperatorLine'
import ProblemFeed from '../../Components/ProblemFeed'

export default function Topic(props) {

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
        },
        reports: [{
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
                problem_what: "wi-fi",
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
        ]
    };

    return (
        <>
            <Container className="view-port">
                <Container fluid="lg">
                    <Row>
                        <Col sm={4} md={3} className="header-comp">
                            <HeaderWeb currentPage={props.pageName} />
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
                                <SeperatorLine thisValue="Topic posts"/>
                                <ProblemFeed thisPosts={topic_obj.reports}/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}