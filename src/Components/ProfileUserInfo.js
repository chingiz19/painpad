import React, { useRef, useState } from 'react';
import './ProfileUserInfo.css';
import Validate from 'validate.js';
// import { useMutation } from '@apollo/react-hooks';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Occupations from './Lists/Occupations'
import Indsutries from './Lists/Industries'
import UserStats from './UserStats'
import Locations from './Lists/Locations'

import UserProfPic from '../images/users/profile-pictures/elnarsharifli.jpg'

export default function ProfileUserInfo() {
    const [editInfo, setEditInfo] = useState(false)

    let firstName = useRef(null);
    let lastName = useRef(null);
    let email = useRef(null);
    let password = useRef(null);
    let jobTitle = null;
    let industry = null;
    let location = null;

    let userInfo = {};

    // check session and retrieve user info
    if (true) {
        userInfo = {
            firstName: "Elnar",
            lastName: "Sharifli",
            email: "elnarsharifli@gmail.com",
            jobTitle: "Reporting Analyst",
            location: {
                "id": "1",
                "value": "Calgary, Canada"
            },
            industry: {
                "id": "2",
                "value": "Investment Management",
                "__typename": "Pair"
            }
        }

    }

    const [stateObj, setMessage] = useState({
        firstNameMessage: null,
        lastNameMessage: null
    });

    const constraints = {
        firstName: {
            format: {
                pattern: "[a-zA-Z]+"
            }
        },
        lastName: {
            format: {
                pattern: "[a-zA-Z]+"
            }
        },
        jobTitle: {
            presence: { allowEmpty: false }
        },
        industry: {
            presence: { allowEmpty: false }
        },
        location: {
            presence: { allowEmpty: false }
        },
        email: {
            email: {
                message: "Please enter valid email"
            }
        },
        password: {
            length: {
                minimum: 6
            }
        }
    };

    function handleChangeJobTitle(newValue) {
        jobTitle = newValue;
    }

    function handleChangeIndustry(newValue) {
        industry = newValue;
    }

    function handleChangeLocation(newValue) {
        location = newValue;
    }

    function handleHideEditInfo() {
        setEditInfo(true);
    }

    function handleShowEditInfo() {
        setEditInfo(false);
        updateUserInfo();
    }

    // const [callUpdateUserInfo, { loading, error, data }] = useMutation(USER_UPDATE_INFO);

    const updateUserInfo = e => {
        let check = Validate({
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            jobTitle: jobTitle,
            industry: industry,
            location: location,
            email: email.current.value,
            password: password.current.value
        }, constraints);

        setMessage(prevState => {
            return {
                ...prevState,
                firstNameMessage: check && check.firstName ? "Can only contain letters" : null,
                lastNameMessage: check && check.lastName ? "Can only contain letters" : null,
                usernameMessage: check && check.email ? "Please enter valid email" : null,
                jobTitleMessage: check && check.jobTitle ? "Can only contain letters" : null,
                industryMessage: check && check.industry ? "Required" : null,
                locationMessage: check && check.location ? "Required" : null,
                passMessage: check && check.password ? "Minimum 6 characters or more" : null
            }
        });

        if (!check) {
            // callUpdateUserInfo({
            //     variables: {
            //         email: email.current.value,
            //         pwd: password.current.value
            //     }
            // });
        }

    };

    return (
        <Container fluid className="user-info-container">
            <Row>
                <Col sm={3} className="img-col">
                    <img src={UserProfPic} className="user-prof-pic" alt="User Profile" />
                    <UserStats />
                    <button className="user-prof-btn picture-btn">Edit</button>
                </Col>
                <Col sm={9} className="info-col">
                    <div className="input-btn-section">
                        <button className={(!editInfo ? 'user-prof-btn info-edit-btn' : 'hide')} onClick={handleHideEditInfo}>Edit</button>
                        <div className="input-section">
                            <div className="user-names-div">

                                <div className={(!stateObj.firstNameMessage ? 'user-input' : 'user-input error')}>
                                    <label>First Name</label>
                                    <input name="first-name"
                                        value={userInfo.firstName}
                                        ref={firstName}
                                        disabled={!editInfo}
                                        type="text" />
                                    <span className="helper-txt">{stateObj.firstNameMessage}</span>
                                </div>

                                <div className={(!stateObj.firstNameMessage ? 'user-input lname' : 'user-input error lname')}>
                                    <label>Last Name</label>
                                    <input name="first-name"
                                        value={userInfo.lastName}
                                        ref={lastName}
                                        disabled={!editInfo}
                                        type="text" />
                                    <span className="helper-txt">{stateObj.lastNameMessage}</span>
                                </div>
                            </div>

                            <Indsutries thisDisabled={!editInfo}
                                thisValue={userInfo.industry}
                                helperText={stateObj.industryMessage}
                                onChange={handleChangeIndustry}
                                thisClassName="autocomplete" />

                            <Occupations thisDisabled={!editInfo}
                                thisValue={userInfo.jobTitle}
                                helperText={stateObj.jobTitleMessage}
                                onChange={handleChangeJobTitle}
                                thisClassName="autocomplete" />

                            <Locations thisDisabled={!editInfo}
                                thisValue={userInfo.location}
                                helperText={stateObj.locationMessage}
                                onChange={handleChangeLocation}
                                thisClassName="autocomplete" />

                            <div className={(!stateObj.usernameMessage ? 'user-input email' : 'user-input error email')}>
                                <label>Email</label>
                                <input name="user-email"
                                    value={userInfo.email}
                                    ref={email}
                                    disabled={!editInfo}
                                    type="email" />
                                <span className="helper-txt">{stateObj.usernameMessage}</span>
                            </div>

                            <div className={(!stateObj.passMessage ? 'user-input password' : 'user-input error password')}>
                                <input name="user-email"
                                    ref={password}
                                    disabled={!editInfo}
                                    placeholder="Password"
                                    type="password" />
                                <span className="helper-txt">{stateObj.passMessage}</span>
                            </div>
                        </div>
                        <button className={(!editInfo ? 'hide' : 'user-prof-btn info-update-btn')} onClick={handleShowEditInfo}>Update</button>
                    </div>
                </Col>
            </Row>
        </Container>

    );
}