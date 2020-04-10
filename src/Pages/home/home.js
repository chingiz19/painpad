import React from 'react';
import './Home.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HeaderWeb from '../../Components/HeaderWeb'
import WriteReport from '../../Components/WriteReport';

export default function Home() {
    return (
        <>
            <Container className="view-port">
                <Container fluid="lg">
                    <Row>
                        <Col sm={4} md={3} className="header-cont">
                            <HeaderWeb/>
                        </Col>
                        <Col sm={8} md={9} className="main-cont">
                            <div className="main">
                                <WriteReport/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}