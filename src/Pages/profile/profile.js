import React from 'react';
import './Profile.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HeaderWeb from '../../Components/HeaderWeb'
import ProfileUserInfo from '../../Components/ProfileUserInfo'
import ProblemFeed from '../../Components/ProblemFeed'

export default function Profile(props) {
    return (
        <>
            <Container className="view-port">
                <Container fluid="lg">
                    <Row>
                        <Col sm={4} md={3} className="header-comp">
                            <HeaderWeb currentPage={props.pageName}/>
                        </Col>
                        <Col sm={8} md={9} className="main-comp">
                            <div className="div-1">
                                <ProfileUserInfo/>
                                <div className="info-reports-seperator">
                                    <div className="line-sep"></div>
                                    <span className="txt-sep">My reports</span>
                                </div>
                                <ProblemFeed/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}