import React from 'react';
import './Profile.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HeaderWeb from '../../Components/HeaderWeb'
import ProfileUserInfo from '../../Components/ProfileUserInfo'

export default function Profile() {
    return (
        <>
            <Container className="view-port">
                <Container fluid="lg">
                    <Row>
                        <Col sm={4} md={3} className="header-comp">
                            <HeaderWeb/>
                        </Col>
                        <Col sm={8} md={9} className="main-comp">
                            <div className="main">
                                <div className="problems-div">
                                    <ProfileUserInfo/>
                                    <div className="info-reports-seperator">
                                        <div className="line-sep"></div>
                                        <span className="txt-sep">My reports</span>
                                    </div>
                                    {/* User reports go here */}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}