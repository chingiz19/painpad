import React, { useState } from 'react';
import './About.css';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Fade from 'react-reveal/Fade';
import HeaderWeb from '../../Components/HeaderWeb';
import Header from './Components/AboutHeader';
import EntrepreneurAdvice from './Components/EntrepreneurAdvice';
import SeperatorLineAbout from './Components/SeperatorLineAbout';
import OurStory from './Components/OurStory';
import PeoplesChallenge from './Components/PeoplesChallenge';
import TheSolution from './Components/TheSolution';


export default function About(props) {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState(false);

    const IS_USER_SIGNED_IN = gql`
        query isLogin{
            isLogin {success, id}
        }
    `;

    useQuery(IS_USER_SIGNED_IN, {
        onCompleted: data => {
            setUserId(data.isLogin.id);
            setIsSignedIn(data.isLogin.success);
        }
    });

    return (
        <>
            <Container className="view-port">
                <Container fluid="lg">
                    <Row>
                        <Col sm={4} md={3} className="header-comp">
                            <HeaderWeb currentPage={props.pageName}
                                isSignedIn={isSignedIn}
                                userId={userId} />
                        </Col>
                        <Col sm={8} md={9} className="main-comp about">
                            <Header/>
                            <Fade>
                                <SeperatorLineAbout label="Entrepreneur Advice" />
                                <EntrepreneurAdvice />
                                <SeperatorLineAbout label="Our Story" />
                                <OurStory />
                            </Fade>
                            <Fade>
                                <SeperatorLineAbout label="Problems are All Over Internet" />
                            </Fade>
                            <PeoplesChallenge/>
                            <Fade delay={1000}>
                                <SeperatorLineAbout label="Here is Solution to Problem" />
                            </Fade>
                            <TheSolution/>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}