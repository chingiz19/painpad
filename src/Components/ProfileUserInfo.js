import React, { useRef, useState } from 'react';
import './ProfileUserInfo.css';
import Validate from 'validate.js';
// import { useMutation } from '@apollo/react-hooks';
import TextField from '@material-ui/core/TextField';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import JobTitles from './Lists/JobTitles'
import Indsutries from './Lists/Industries'
import UserStats from './UserStats'

import UserProfPic from '../images/users/profile-pictures/elnarsharifli.jpg'

export default function ProfileUserInfo() {
    const [editInfo, setEditInfo] = useState(false)

    let firstName = useRef(null);
    let lastName = useRef(null);
    let email = useRef(null);
    let password = useRef(null);
    let jobTitle = null;
    let industry = null;

    let userInfo = {};

    // check session and retrieve user info
    if (true) {
        userInfo = {
            firstName: "Elnar",
            lastName: "Sharifli",
            email: "elnarsharifli@gmail.com",
            jobTitle: "Reporting Analyst",
            industry: {
                "id": "2",
                "value": "Investment Management"
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
                    <button className="pic-btn user-prof-btn">Edit</button>
                </Col>
                <Col sm={9} className="info-col">
                    <div className="input-btn-section">
                        <button className={(!editInfo ? 'user-prof-btn info-edit-btn' : 'hide')} onClick={handleHideEditInfo}>Edit</button>
                        <div className="input-section">
                            <div className="user-names-div">
                                <TextField required
                                    disabled={!editInfo}
                                    error={stateObj.firstNameMessage != null}
                                    label="First name"
                                    name="first-name"
                                    inputRef={firstName}
                                    value={userInfo.firstName}
                                    helperText={stateObj.firstNameMessage}
                                    className="text-field"
                                    size="small"
                                    type="text" />

                                <TextField required
                                    disabled={!editInfo}
                                    error={stateObj.lastNameMessage != null}
                                    label="Last name"
                                    name="last-name"
                                    inputRef={lastName}
                                    value={userInfo.lastName}
                                    helperText={stateObj.lastNameMessage}
                                    className="text-field last-name"
                                    size="small"
                                    type="text" />
                            </div>

                            <Indsutries thisDisabled={!editInfo}
                                thisVariant="standard"
                                thisValue={userInfo.industry}
                                thisWidth={230}
                                errorMessage={stateObj.industryMessage}
                                onChange={handleChangeIndustry}
                                thisClassName="autocomplete" />

                            <JobTitles thisDisabled={!editInfo}
                                thisVariant="standard"
                                thisValue={userInfo.jobTitle}
                                thisWidth={230}
                                errorMessage={stateObj.jobTitleMessage}
                                onChange={handleChangeJobTitle}
                                thisClassName="autocomplete" />

                            <TextField required
                                disabled={!editInfo}
                                error={stateObj.usernameMessage != null}
                                label="Email"
                                name="email"
                                inputRef={email}
                                value={userInfo.email}
                                helperText={stateObj.usernameMessage}
                                className="text-field"
                                size="small"
                                type="email" />

                            <TextField required
                                disabled={!editInfo}
                                error={stateObj.passMessage != null}
                                id="signin-password"
                                label="Password"
                                name="password"
                                inputRef={password}
                                helperText={stateObj.passMessage}
                                className="text-field"
                                size="small"
                                type="password" />
                        </div>
                        <button className={(!editInfo ? 'hide' : 'user-prof-btn info-update-btn')} onClick={handleShowEditInfo}>Update</button>
                    </div>
                </Col>
            </Row>
        </Container>

    );
}