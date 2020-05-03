import React, { useRef, useState } from 'react';
import './ProfileUserInfo.css';
import './UserInput.css';
import Validate from 'validate.js';
// import { useMutation } from '@apollo/react-hooks';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Occupations from './Lists/Occupations'
import Indsutries from './Lists/Industries'
import UserStats from './UserStats'
import Locations from './Lists/Locations'
import ChangePassword from '../Modals/ChangePassword'

export default function ProfileUserInfo() {
    let userInfoBE = {};

    let firstName = useRef(null);
    let lastName = useRef(null);
    let email = useRef(null);
    let password = useRef(null);
    let jobTitle = null;
    let industry = null;
    let location = null;

    const [editInfo, setEditInfo] = useState(false);

    const [stateObj, setMessage] = useState({
        firstNameMessage: null,
        lastNameMessage: null,
        emailMessage: null,
        jobTitleMessage: null,
        industryMessage: null,
        locationMessage: null,
        passMessage: null
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
            email: true,
            presence: { allowEmpty: false }
        },
        password: {
            length: {
                minimum: 6
            }
        }
    };

    // check session and retrieve user info
    if (true) {
        userInfoBE = {
            firstName: "Elnar",
            lastName: "Sharifli",
            email: "elnarsharifli@gmail.com",
            jobTitle: "Reporting Analyst",
            profileImg: "https://www.telegraph.co.uk/content/dam/technology/2017/11/01/emoji_update_2017_1_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.png?imwidth=450",
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
        if (editInfo) {
            window.location.reload();
        }
        setEditInfo(!editInfo);
    }

    function handleShowEditInfo() {
        setEditInfo(false);
    }

    // const [callUpdateUserInfo, { loading, error, data }] = useMutation(USER_UPDATE_INFO);

    const updateUserInfo = e => {
        let check = Validate({
            firstName: (firstName.current.value || firstName.current.value === '') ? firstName.current.value : userInfoBE.firstName,
            lastName: (lastName.current.value || lastName.current.value === '') ? lastName.current.value : userInfoBE.lastName,
            jobTitle: jobTitle ? jobTitle : userInfoBE.jobTitle,
            industry: industry ? industry : userInfoBE.industry,
            location: location ? location : userInfoBE.location,
            email: (email.current.value || email.current.value === '') ? email.current.value : userInfoBE.email,
            password: password.current.value
        }, constraints);

        setMessage(prevState => {
            return {
                ...prevState,
                firstNameMessage: check && check.firstName ? "Can only contain letters" : null,
                lastNameMessage: check && check.lastName ? "Can only contain letters" : null,
                usernameMessage: check && check.email && check.email[0] ? "Please enter valid email" : null,
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
            handleShowEditInfo();
        }

    };

    return (
        <Container fluid className="user-info-container">
            <Row>
                <Col sm={3} className="img-col">
                    <img src={userInfoBE.profileImg} className="user-prof-pic" alt="User Profile" />
                    <UserStats />
                    <button className="btn-user-prof picture-btn">Edit</button>
                </Col>
                <Col sm={9} className="info-col">
                    <div className="input-btn-section">
                        <button className="btn-user-prof info-edit-btn"
                            onClick={handleHideEditInfo}>{!editInfo ? 'Edit' : 'Cancel'}</button>
                        <div className="input-section">
                            <div className="user-names-div">

                                <div className={(!stateObj.firstNameMessage ? 'user-input' : 'user-input error')}>
                                    <label>First Name</label>
                                    <input name="firstName"
                                        defaultValue={userInfoBE.firstName}
                                        ref={firstName}
                                        disabled={!editInfo}
                                        type="text" />
                                    <span className="helper-txt">{stateObj.firstNameMessage}</span>
                                </div>

                                <div className={(!stateObj.lastNameMessage ? 'user-input lname' : 'user-input error lname')}>
                                    <label>Last Name</label>
                                    <input name="lastName"
                                        defaultValue={userInfoBE.lastName}
                                        ref={lastName}
                                        disabled={!editInfo}
                                        type="text" />
                                    <span className="helper-txt">{stateObj.lastNameMessage}</span>
                                </div>
                            </div>

                            <Indsutries thisDisabled={!editInfo}
                                thisValue={userInfoBE.industry}
                                helperText={stateObj.industryMessage}
                                onChange={handleChangeIndustry}
                                thisClassName="autocomplete" />

                            <Occupations thisDisabled={!editInfo}
                                thisValue={userInfoBE.jobTitle}
                                helperText={stateObj.jobTitleMessage}
                                onChange={handleChangeJobTitle}
                                thisClassName="autocomplete" />

                            <Locations thisDisabled={!editInfo}
                                thisValue={userInfoBE.location}
                                helperText={stateObj.locationMessage}
                                onChange={handleChangeLocation}
                                thisClassName="autocomplete" />

                            <ChangePassword showEdit={editInfo}/>

                            {/* <div className={(!stateObj.usernameMessage ? 'user-input email' : 'user-input error email')}>
                                <label>Email</label>
                                <input name="user-email"
                                    defaultValue={userInfoBE.email}
                                    ref={email}
                                    disabled={!editInfo}
                                    type="email" />
                                <span className="helper-txt">{stateObj.usernameMessage}</span>
                            </div> */}

                            {/* <div className={(!stateObj.passMessage ? 'user-input password' : 'user-input error password')}>
                                <input name="user-email"
                                    ref={password}
                                    disabled={!editInfo}
                                    placeholder="Password"
                                    type="password" />
                                <span className="helper-txt">{stateObj.passMessage}</span>
                            </div> */}
                        </div>
                        <button className={(!editInfo ? 'hide' : 'btn-user-prof btn-info-update')} 
                            onClick={updateUserInfo}>Update</button>
                    </div>
                </Col>
            </Row>
        </Container>

    );
}