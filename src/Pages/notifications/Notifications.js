import React from 'react';
import './Notifications.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HeaderWeb from '../../Components/HeaderWeb'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import NotificationsList from '../../Components/NotificationsList';


export default function Topic(props) {

    const IS_USER_SIGNED_IN = gql`
        query isLogin{
            isLogin {success, id}
        }
    `;

    const GET_NOTIFICATIONS = gql`
        query notifications {
            notifications {
                id, header, subheader, description, created, icon, action, 
                type{
                  id, backgroundColor, icon, isUserIcon, description
                },
                postText,
                seen
              }
        }
    `;

    const { data: isSignedIn } = useQuery(IS_USER_SIGNED_IN);

    const { data: notifications } = useQuery(GET_NOTIFICATIONS);

    return (
        <>
            <Container className="view-port">
                <Container fluid="lg">
                    <Row>
                        <Col sm={4} md={3} className="header-comp">
                            <HeaderWeb currentPage={props.pageName} 
                                isSignedIn={isSignedIn}/>
                        </Col>
                        <Col sm={8} md={9} className="main-comp main-notif">
                            <div className="main-header">Notifications</div>
                            <NotificationsList notifs={(notifications && notifications.notifications) || []}/>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}