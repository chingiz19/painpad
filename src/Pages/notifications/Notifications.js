import React, {useState} from 'react';
import './Notifications.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HeaderWeb from '../../Components/HeaderWeb'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import NotificationsList from '../../Components/NotificationsList';
import DynamicIcon from '../../Components/Helpers/DynamicIcon';

export default function Topic(props) {
    const [notifications, setNotifications] = useState([]);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState(false);

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

    useQuery(IS_USER_SIGNED_IN, {
        onCompleted: data =>{
            setUserId(data.isLogin.id);
            setIsSignedIn(data.isLogin.success);
        }
    });

    useQuery(GET_NOTIFICATIONS, {
        onCompleted: data =>{
            setTimeout(() => {
                setNotifications(data.notifications);
            }, 1000);
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
                                userId={userId}/>
                        </Col>
                        <Col sm={8} md={9} className="main-comp main-notif">
                            <div className="main-header">Notifications</div>
                            {!notifications.length
                                ?
                                <DynamicIcon type="loading" width="200" height="200" />
                                :
                                <NotificationsList notifs={notifications} />}
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}