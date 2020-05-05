import React, { useRef, useState } from 'react';
import './ProfileUserInfo.css';
import './UserInput.css';
import Validate from 'validate.js';
import Loading from './Loading'
import { useMutation } from '@apollo/react-hooks';
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
import ChangeUserPic from '../Modals/ChangeUserPic'

export default function ProfileUserInfo() {
    let userId = parseInt(window.location.href.split("users/")[1]);

    let firstName = useRef(null);
    let lastName = useRef(null);
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
        }
    };

    const POST_USER_INFO = gql`
            mutation changeprofile($firstName: String!, $lastName: String!, $occupationId: ID!, $locationId: ID!, $industryId: ID!, $profilePic: String!){
            changeProfile(
                firstName: $firstName,
                lastName: $lastName,
                occupationId: $occupationId,
                locationId: $locationId,
                industryId: $industryId,
                profilePic: $profilePic
              )
        }
    `;

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

    const { data: dataGetUserInfo, loading: loadingUserInfoBE } = useQuery(GET_USER_INFO, {
        variables: {
            userId: userId
        },
    });

    const [callPostUserInfo, { data: dataPostUserInfo, loading: loadingPostUserInfo, error: errorPostUserInfo}] = useMutation(POST_USER_INFO);

    let userInfoBE = dataGetUserInfo ? dataGetUserInfo.userProfile.user : {};

    if (dataPostUserInfo) {
        reloadApp(2000);
    }

    function reloadApp(newValue) {
        setTimeout(() => {
            window.location.reload();
        }, newValue);
    }

    function handleChangeJobTitle(newValue) {
        occupation = newValue[0];
    }

    function handleChangeIndustry(newValue) {
        industry = newValue[0];
    }

    function handleChangeLocation(newValue) {
        location = newValue[0];
    }

    function handleHideEditInfo() {
        if (editInfo) {
            reloadApp(0);
        }
        setEditInfo(!editInfo);
    }

    const updateUserInfo = e => {

        let check = Validate({
            firstName: (firstName.current.value || firstName.current.value === '') ? firstName.current.value : userInfoBE.firstName,
            lastName: (lastName.current.value || lastName.current.value === '') ? lastName.current.value : userInfoBE.lastName,
            occupation: occupation ? occupation : userInfoBE.occupation,
            industry: industry ? industry : userInfoBE.industry,
            location: location ? location : userInfoBE.location
        }, constraints);

        setMessage(prevState => {
            return {
                ...prevState,
                firstNameMessage: check && check.firstName ? "Can only contain letters" : null,
                lastNameMessage: check && check.lastName ? "Can only contain letters" : null,
                jobTitleMessage: check && check.occupation ? "Can only contain letters" : null,
                industryMessage: check && check.industry ? "Required" : null,
                locationMessage: check && check.location ? "Required" : null
            }
        });

        if (!check) {
            callPostUserInfo({
                variables: {
                    firstName: firstName ? firstName.current.value : userInfoBE.firstName,
                    lastName: lastName ? lastName.current.value : userInfoBE.lastName,
                    occupationId: parseInt(occupation ? occupation.occupationId : userInfoBE.occupation.occupationId),
                    locationId: parseInt(location ? location.locationId : userInfoBE.location.locationId),
                    industryId: parseInt(industry ? industry.industryId : userInfoBE.industry.industryId),
                    profilePic: userInfoBE.profilePic
                }
            });
        }

    };

    return (
        <Container fluid className="user-info-container">
            <Row>
                <Col sm={3} className="img-col">
                    <img src={userInfoBE.profilePic} className="user-prof-pic" alt="User Profile" />
                    <UserStats userScore={userInfoBE.score} userId={userId}/>
                    <ChangeUserPic userId={userId} userPic={userInfoBE.profilePic}/>
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

                            <ChangePassword showEdit={editInfo} />

                        </div>

                        {(loadingPostUserInfo || dataPostUserInfo)
                            ? <Loading done={dataPostUserInfo} loading={loadingPostUserInfo} thisClass="loadding-user-info"/>
                            : <button className={(!editInfo ? 'hide' : 'btn-user-prof btn-info-update')} onClick={updateUserInfo}>Update</button>}

                        {errorPostUserInfo && <Loading error={errorPostUserInfo} />}
                    </div>
                </Col>
            </Row>
        </Container>

    );
}