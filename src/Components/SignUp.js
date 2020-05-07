import React, { useRef, useState } from 'react';
import './SignUp.css';
import './UserInput.css';
import Loading from '../Components/Helpers/Loading'
import Validate from 'validate.js';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import Locations from './Lists/Locations'
import Indsutries from './Lists/Industries'

export default function SignUp() {
    const firstName = useRef(null);
    const lastName = useRef(null);
    const email = useRef(null);
    const pass = useRef(null);
    const [industry, setIndustry] = useState(null);
    const [city, setCity] = useState(null)

    const [stateObj, setMessage] = useState({
        firstNameMessage: null,
        lastNameMessage: null,
        emailMessage: null,
        cityMessage: null,
        industryMessage: null,
        passMessage: null,
        signUpLoading: false,
        signUpError: false,
        signUpData: false
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
        city: {
            presence: { allowEmpty: false }
        },
        industry: {
            presence: { allowEmpty: false }
        },
        email: {
            email: true,
            presence: { allowEmpty: false }
        },
        pass: {
            length: {
                minimum: 6
            }
        }
    };

    function handleChangeIndustry(newValue) {
        setIndustry(newValue[0]);
    }

    function handleChangeCity(newValue) {
        setCity(newValue[0]);
    }

    const USER_SIGN_UP = gql`
        mutation SignUp($firstName: String!, $lastName: String!, $email: String!, $pwd: String!, $cityId: ID!, $industryId: ID!){
            signup(firstName: $firstName, lastName: $lastName, email: $email, pwd: $pwd, cityId: $cityId, industryId: $industryId)
        }
    `;

    const [callUserSignUp, { loading, error, data: userSignUp }] = useMutation(USER_SIGN_UP);

    if (userSignUp) {
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    const submitInput = e => {
        let check = Validate({
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            email: email.current.value,
            pass: pass.current.value,
            city: city.value,
            industry: industry.value
        }, constraints);

        setMessage(prevState => {
            return {
                ...prevState,
                firstNameMessage: check && check.firstName ? "Can only contain letters" : null,
                lastNameMessage: check && check.lastName ? "Can only contain letters" : null,
                emailMessage: check && check.email && check.email[0] ? "Please enter valid email" : null,
                passMessage: check && check.pass ? "Minimum 6 characters" : null,
                cityMessage: check && check.city ? "Required" : null,
                industryMessage: check && check.industry ? "Required" : null
            }
        });

        if (!check) {
            callUserSignUp({
                variables: {
                    firstName: firstName.current.value,
                    lastName: lastName.current.value,
                    email: email.current.value,
                    pwd: pass.current.value,
                    cityId: parseInt(city.id),
                    industryId: parseInt(industry.id)
                }
            });
        }

    }

    return (
        <>
            <div className="signup-main">

                <div className="names-div">
                    <div className={(!stateObj.firstNameMessage ? 'user-input names-input' : 'user-input error names-input')}>
                        <label>First Name</label>
                        <input name="firstName"
                            ref={firstName}
                            type="text" />
                        <span className="helper-txt">{stateObj.firstNameMessage}</span>
                    </div>

                    <div className={(!stateObj.lastNameMessage ? 'user-input names-input' : 'user-input error names-input')}>
                        <label>Last Name</label>
                        <input name="lastName"
                            ref={lastName}
                            type="text" />
                        <span className="helper-txt">{stateObj.lastNameMessage}</span>
                    </div>
                </div>

                <div className={(!stateObj.emailMessage ? 'user-input' : 'user-input error')}>
                    <label>Email</label>
                    <input name="lastName"
                        ref={email}
                        type="email" />
                    <span className="helper-txt">{stateObj.emailMessage}</span>
                </div>

                <Indsutries helperText={stateObj.industryMessage}
                    onChange={handleChangeIndustry}
                    thisClassName="autocomplete" />

                <Locations helperText={stateObj.cityMessage}
                    onChange={handleChangeCity}
                    thisClassName="autocomplete" />

                <div className={(!stateObj.passMessage ? 'user-input' : 'user-input error')}>
                    <label>Password</label>
                    <input name="password"
                        ref={pass}
                        type="password" />
                    <span className="helper-txt">{stateObj.passMessage}</span>
                </div>

                {(loading || userSignUp)
                    ? <Loading done={userSignUp} loading={loading} />
                    : <button className="submit-btn" onClick={submitInput}>Sign Up</button>}

                {error && <Loading error={error} />}

            </div>
        </>
    );
}