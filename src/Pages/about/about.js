import React from 'react';
import './About.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HeaderWeb from '../../Components/HeaderWeb'

export default function About(props) {

    return (
        <Container className="view-port">
            <Container fluid="lg">
                <Row>
                    <Col sm={4} md={3} className="header-comp">
                        <HeaderWeb currentPage={props.pageName} />
                    </Col>
                    <Col sm={8} md={9} className="main-comp">
                        <div className="main">
                            <h3>Our story goes here bro..</h3>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}