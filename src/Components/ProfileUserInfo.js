import React from 'react'
import './ProfileUserInfo.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import UserProfPic from '../images/users/profile-pictures/elnarsharifli.jpg'

export default function ProfileUserInfo() {

    return (
        <Container fluid className="user-info-container">
            <Row>
                <Col sm={3} className="img-col">
                    <img src={UserProfPic} className="user-prof-pic" alt="User Profile" />
                    <span className="user-pnts">230 Points</span>
                    <button className="user-pic-btn">Edit</button>
                </Col>
                <Col sm={9} className="info-col">
                    <div>
                        <h1>info</h1>
                    </div>
                </Col>
            </Row>
        </Container>
        
    );
}