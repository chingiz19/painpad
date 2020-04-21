import React from 'react';
import './Home.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HeaderWeb from '../../Components/HeaderWeb'
import WriteReport from '../../Components/WriteReport';
import ProblemFeed from '../../Components/ProblemFeed'

export default function Home(props) {
    return (
        <>
            <Container className="view-port">
                <Container fluid="lg">
                    <Row>
                        <Col sm={4} md={3} className="header-comp">
                            <HeaderWeb currentPage={props.pageName}/>
                        </Col>
                        <Col sm={8} md={9} className="main-comp">
                            <div className="main">
                                <div className="problems-div">
                                    <WriteReport/>
                                        <div className="wr-feed-seperator"></div>
                                    <ProblemFeed/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}