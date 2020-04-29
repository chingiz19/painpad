import React, { useRef, useState } from 'react';
import './SignUp.css';
import Validate from 'validate.js';
import TextField from '@material-ui/core/TextField';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import Locations from './Lists/Locations'
import Indsutries from './Lists/Industries'

export default function SignUp() {
    const firstName = useRef(null);
    const lastName = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    let city = null;
    let industry = null;

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

    function handleChangeIndustry(newValue) {
        industry = newValue;
    }

    function handleChangeCity(newValue) {
        city = newValue;
    }

    const USER_SIGN_UP = gql`
        mutation SignUp($firstName: String!, $lastName: String!, $email: String!, $pwd: String!, $cityId: ID!, $industryId: ID!){
            signup(firstName: $firstName, lastName: $lastName, email: $email, pwd: $pwd, cityId: $cityId, industryId: $industryId)
        }
    `;

    const [callUserSignUp, { loading, error, data }] = useMutation(USER_SIGN_UP);

    const submitInput = e => {
        let check = Validate({
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            email: email.current.value,
            password: password.current.value,
            city: city.value,
            industry: industry.value
        }, constraints);

        setMessage(prevState => {
            return {
                ...prevState,
                firstNameMessage: check && check.firstName ? "Can only contain letters" : null,
                lastNameMessage: check && check.lastName ? "Can only contain letters" : null,
                emailMessage: check && check.email ? "Please enter valid email" : null,
                passMessage: check && check.password ? "Minimum 6 characters or more" : null,
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
                    pwd: password.current.value,
                    cityId: parseInt(city.id),
                    industryId: parseInt(industry.id)
                }
            });
        }

    }

    return (
        <>
            <div className="signup-main">

                <TextField required
                    error={stateObj.firstNameMessage != null}
                    label="First name"
                    name="first-name"
                    inputRef={firstName}
                    helperText={stateObj.firstNameMessage}
                    variant="outlined"
                    size="small"
                    type="text" />

                <TextField required
                    error={stateObj.lastNameMessage != null}
                    label="Last name"
                    name="last-name"
                    inputRef={lastName}
                    helperText={stateObj.lastNameMessage}
                    variant="outlined"
                    size="small"
                    type="text" />

                <TextField required
                    error={stateObj.emailMessage != null}
                    label="Email"
                    name="email"
                    inputRef={email}
                    helperText={stateObj.emailMessage}
                    variant="outlined"
                    size="small"
                    type="email" />

                <Indsutries thisVariant="outlined" 
                    thisWidth={194} 
                    errorMessage={stateObj.industryMessage} 
                    onChange={handleChangeIndustry}/>

                <Locations thisVariant="outlined" 
                    thisWidth={194} 
                    errorMessage={stateObj.cityMessage} 
                    onChange={handleChangeCity}/>

                <TextField required
                    error={stateObj.passMessage != null}
                    id="signin-password"
                    label="Password"
                    name="password"
                    inputRef={password}
                    helperText={stateObj.passMessage}
                    variant="outlined"
                    size="small"
                    type="password" />

                <button onClick={submitInput}>Submit</button>

                <div>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error :( Please try again</p>}
                    {data && <p>Data is here {JSON.stringify(data.signup)}</p>}
                </div>
            </div>
        </>
    );
}