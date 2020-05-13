import React from 'react';
import { Helmet } from 'react-helmet';
import './About.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HeaderWeb from '../../Components/HeaderWeb'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

export default function About(props) {

    const IS_USER_SIGNED_IN = gql`
        query isLogin{
            isLogin {success, id}
        }
    `;

    const { data: isUserSignedIn } = useQuery(IS_USER_SIGNED_IN);

    return (
        <>
            <Helmet>
                <title>PainPad | About</title>
            </Helmet>
            <Container className="view-port">
                <Container fluid="lg">
                    <Row>
                        <Col sm={4} md={3} className="header-comp">
                            <HeaderWeb currentPage={props.pageName} isUserSignedIn={isUserSignedIn} />
                        </Col>
                        <Col sm={8} md={9} className="main-comp">
                            <div className="main">
                                <h3>Our story goes here bro..</h3>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}