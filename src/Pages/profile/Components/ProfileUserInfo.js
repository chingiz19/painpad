import React, { useRef, useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Validate from 'validate.js';
import './ProfileUserInfo.css';
import '../../../Components/UserInput.css';
import DynamicIcon from '../../../Components/Helpers/DynamicIcon';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Occupations from '../../../Components/Lists/Occupations';
import Indsutries from '../../../Components/Lists/Industries';
import UserStats from './UserStats';
import Locations from '../../../Components/Lists/Locations';
import ChangePassword from '../../../Modals/ChangePassword';
import ChangeUserPic from '../../../Modals/ChangeUserPic';
import GoogleAnalytics from '../../../Components/Helpers/GoogleAnalytics';


export default function ProfileUserInfo(props) {
    let pageUserId = parseInt(window.location.href.split("users/")[1]);

    let firstName = useRef(null);
    let lastName = useRef(null);
    let location = null;

    const [editInfo, setEditInfo] = useState(false);

    const [industry, setIndustry] = useState(null);
    const [occupation, setOccupation] = useState(null);

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
            mutation changeprofile($firstName: String!, $lastName: String!, $occupationId: ID, $locationId: ID!, $industryId: ID!, $profilePic: String!){
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

    const ADD_INDUSTRY = gql`
        mutation addIndustry($name: String!){
            addIndustry(name: $name)
        }
    `;

    const ADD_OCCUPATION = gql`
        mutation addOccupation($name: String!){
            addOccupation(name: $name)
        }
    `;

    const { data: dataGetUserInfo, loading: loadingUserInfoBE } = useQuery(GET_USER_INFO, {
        variables: {
            userId: pageUserId
        }
    });

    const [callAddIndustry] = useMutation(ADD_INDUSTRY, {
        onCompleted: data => {
            setIndustry({industryId: data.addIndustry});
        }
    });

    const [callAddOccupation] = useMutation(ADD_OCCUPATION, {
        onCompleted: data => {
            setOccupation({occupationId: data.addOccupation});
        }
    });

    const [callPostUserInfo, { data: dataPostUserInfo, loading: loadingPostUserInfo, error: errorPostUserInfo }] = useMutation(POST_USER_INFO, {
        onCompleted: data => {
            reloadApp(2000);
        }
    });

    let userInfoBE = dataGetUserInfo ? dataGetUserInfo.userProfile.user : {};
    let isMyProfile = dataGetUserInfo ? dataGetUserInfo.userProfile.self : false;

    function reloadApp(newValue) {
        setTimeout(() => {
            window.location.reload();
        }, newValue);
    }

    function handleChangeOccupation(newValue) {
        let tmpObj = newValue[0];
        if(tmpObj && tmpObj.customOption){
            callAddOccupation({
                variables: {
                    name: tmpObj.occupation
                }
            });
            setOccupation({name: tmpObj.occupation});
        } else{
            setOccupation(tmpObj)
        }
    }

    function handleChangeIndustry(newValue) {
        let tmpObj = newValue[0];
        if(tmpObj && tmpObj.customOption){
            callAddIndustry({
                variables: {
                    name: tmpObj.industry
                }
            });
            setIndustry({name: tmpObj.industry});
        } else{
            setIndustry(tmpObj)
        }
    }

    function handleChangeLocation(newValue) {
        location = newValue[0];
    }

    function handleHideEditInfo() {
        if (editInfo) {
            reloadApp(0);
        }
        setEditInfo(!editInfo);
        
        let objGA={
            category: "User Account",
            action: "Info Edit clicked"
        };
        GoogleAnalytics('', objGA);
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
            const ocupadionId = occupation ? occupation.occupationId : userInfoBE.occupation.occupationId;

            callPostUserInfo({
                variables: {
                    firstName: firstName ? firstName.current.value : userInfoBE.firstName,
                    lastName: lastName ? lastName.current.value : userInfoBE.lastName,
                    occupationId: ocupadionId === '0' ? null : parseInt(ocupadionId),
                    locationId: parseInt(location ? location.locationId : userInfoBE.location.locationId),
                    industryId: parseInt(industry ? industry.industryId : userInfoBE.industry.industryId),
                    profilePic: userInfoBE.profilePic
                }
            });
        }

        let objGA={
            category: "User Account",
            action: "Info Update clicked"
        };
        GoogleAnalytics('', objGA);
    };

    return (
        <Container fluid className="user-info-container">
            <Row>
                <Col sm={3} className="img-col">
                    <img src={userInfoBE.profilePic} className="user-prof-pic" alt="User Profile" />
                    <UserStats isMyProfile={isMyProfile}
                        isSignedIn={props.isSignedIn}
                        pageUserId={pageUserId}
                        myUserId={props.userId}
                        userScore={userInfoBE.score} />
                    <ChangeUserPic isMyProfile={isMyProfile}
                        userId={pageUserId}
                        userPic={userInfoBE.profilePic} />
                </Col>
                <Col sm={9} className="info-col">
                    <div className="input-btn-section">
                        <button className={(isMyProfile ? 'btn-user-prof info-edit-btn' : 'none')}
                            onClick={handleHideEditInfo}>{!editInfo ? 'Edit' : 'Cancel'}</button>
                        <div className="input-section" style={{ paddingBottom: (isMyProfile && (editInfo && !(loadingPostUserInfo || dataPostUserInfo || errorPostUserInfo))) ? '70px' : '0px' }}>
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
                                onChange={handleChangeOccupation}
                                thisClassName="autocomplete" />

                            <Locations thisDisabled={!editInfo}
                                thisValue={userInfoBE.location}
                                helperText={stateObj.locationMessage}
                                thisLoading={loadingUserInfoBE}
                                onChange={handleChangeLocation}
                                thisClassName="autocomplete" />

                            <ChangePassword showEdit={editInfo} isMyProfile={isMyProfile} />

                        </div>

                        {(loadingPostUserInfo || dataPostUserInfo || errorPostUserInfo)
                            ? (dataPostUserInfo || errorPostUserInfo
                                ? <DynamicIcon type={errorPostUserInfo ? 'loadingError' : 'loadingDone'} width='60' height='60' />
                                : <DynamicIcon type='loading' width='60' height='60' />)
                            : <button className={(!editInfo ? 'hide' : 'btn-user-prof btn-info-update')} onClick={updateUserInfo}>Update</button>
                        }
                    </div>
                </Col>
            </Row>
        </Container>

    );
}