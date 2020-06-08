import React from 'react';
import './404.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DynamicIcon from '../../Components/Helpers/DynamicIcon';
import HeaderWeb from '../../Components/HeaderWeb';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';


export default function NotFound(props) {

    const IS_USER_SIGNED_IN = gql`
        query isLogin{
            isLogin {success, id}
        }
    `;

    const { data: isSignedIn } = useQuery(IS_USER_SIGNED_IN);

    return (
        <>
            <Container className="view-port">
                <Container fluid="lg">
                    <Row>
                        <Col sm={4} md={3} className="header-comp">
                            <HeaderWeb currentPage={props.pageName} isSignedIn={isSignedIn} />
                        </Col>
                        <Col sm={8} md={9} className="main-comp">
                            <div className="main main-404">
                                <DynamicIcon type="notFound" width="400" height="280" />
                                <h2>Page Not Found</h2>
                                <p>Sorry, this page could not be found. You may want to check <a href="/">home page</a>.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}