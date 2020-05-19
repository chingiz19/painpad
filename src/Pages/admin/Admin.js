import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import './Admin.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderAdmin from './components/HeaderAdmin';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Posts from './components/Posts';
import Analytics from './components/Analytics';

export default function Admin(props) {
    const [selectedComp, setSelectedComp] = useState('post');

    const IS_USER_ADMIN = gql`
        query isAdmin{
            isAdmin 
        }
    `;

    const { data: isUserAdmin } = useQuery(IS_USER_ADMIN, {
        onError: ({ graphQLErrors }) => {
            window.location.href = "/404";
        }
    });

    function handleSelectComp(type) {
        setSelectedComp(type);
    }

    return (
        <>
            <Helmet>
                <title>PainPad | Admin</title>
            </Helmet>
            <Container className={isUserAdmin && isUserAdmin.isAdmin ? "view-port" : "none"}>
                <Container fluid="lg">
                    <Row>
                        <Col sm={4} md={3} className="comp-header">
                            <HeaderAdmin selectComp={handleSelectComp}/>
                        </Col>
                        <Col sm={8} md={9} className="comp-main">
                            <div className={selectedComp === 'post' ? '' : 'none'}>
                                <Posts/>
                            </div>
                            <div className={selectedComp === 'analytics' ? '' : 'none'}>
                                <Analytics/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}