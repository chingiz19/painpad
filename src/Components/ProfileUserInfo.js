import React, { useRef, useState } from 'react';
import './ProfileUserInfo.css';
import './UserInput.css';
import Validate from 'validate.js';
// import { useMutation } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Occupations from './Lists/Occupations'
import Indsutries from './Lists/Industries'
import UserStats from './UserStats'
import Locations from './Lists/Locations'
import ChangePassword from '../Modals/ChangePassword'

export default function ProfileUserInfo() {
    let userId = parseInt(window.location.href.split("users/")[1]);

    let firstName = useRef(null);
    let lastName = useRef(null);
    let email = useRef(null);
    let password = useRef(null);
    let occupation = null;
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
        occupation: {
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

    const GET_USER_INFO = gql`
        query userProfile($userId: ID!){
            userProfile(userId: $userId) {
            self, user{
                id, firstName, lastName, email, emailVerified, profilePic, 
                occupation {occupationId: id, occupation: value}, 
                industry {industryId: id, industry: value}, 
                location {locationId: id, location: value}, 
                since, score 
            }
            }
        }
    `;

    const {data: dataUserInfoBE, loading: loadingUserInfoBE} = useQuery(GET_USER_INFO, {
        variables: { 
            userId: userId
         },
      });


    let userInfoBE = dataUserInfoBE ? dataUserInfoBE.userProfile.user : {};


    function handleChangeJobTitle(newValue) {
        occupation = newValue;
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
            occupation: occupation ? occupation : userInfoBE.occupation,
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
                jobTitleMessage: check && check.occupation ? "Can only contain letters" : null,
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
                    <img src={userInfoBE.profilePic} className="user-prof-pic" alt="User Profile" />
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
                                thisLoading={loadingUserInfoBE}
                                onChange={handleChangeIndustry}
                                thisClassName="autocomplete" />

                            <Occupations thisDisabled={!editInfo}
                                thisValue={userInfoBE.occupation}
                                helperText={stateObj.jobTitleMessage}
                                thisLoading={loadingUserInfoBE}
                                onChange={handleChangeJobTitle}
                                thisClassName="autocomplete" />

                            <Locations thisDisabled={!editInfo}
                                thisValue={userInfoBE.location}
                                helperText={stateObj.locationMessage}
                                thisLoading={loadingUserInfoBE}
                                onChange={handleChangeLocation}
                                thisClassName="autocomplete" />

                            <ChangePassword showEdit={editInfo}/>

                        </div>
                        <button className={(!editInfo ? 'hide' : 'btn-user-prof btn-info-update')} 
                            onClick={updateUserInfo}>Update</button>
                    </div>
                </Col>
            </Row>
        </Container>

    );
}