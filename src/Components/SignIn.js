import React, { useRef, useState } from 'react';
import Validate from 'validate.js';
import './SignIn.css';
import './UserInput.css';
import Loading from '../Components/Helpers/Loading'
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';

export default function SignIn() {
    const email = useRef(null);
    const password = useRef(null);

    const [stateObj, setMessage] = useState({
        emailMessage: null,
        passMessage: null
    });

    const constraints = {
        email: {
            email: {
                message: "Please enter valid email"
            }
        },
        password: {
            length: {
                minimum: 4
            }
        }
    };

    const USER_SIGN_IN = gql`
        query signin($email: String!, $pwd: String!){
            signin(email: $email, pwd: $pwd)
        }
    `;

    const [callUserSignIn, { loading, error, data: userSignIn }] = useLazyQuery(USER_SIGN_IN);

    if (userSignIn) {
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    const submitInput = e => {
        let check = Validate({
            email: email.current.value,
            password: password.current.value
        }, constraints);

        setMessage(prevState => {
            return {
                ...prevState,
                emailMessage: check && check.email ? "Please enter valid email" : null,
                passMessage: check && check.password ? "Minimum 6 characters or more" : null,
            }
        });

        if (!check) {
            callUserSignIn({
                variables: {
                    email: email.current.value,
                    pwd: password.current.value
                }
            });
        }

    }

    return (
        <>
            <div className="signin-main-div">

                <div className={(!stateObj.emailMessage ? 'user-input' : 'user-input error')}>
                    <label>Email</label>
                    <input name="email"
                        ref={email}
                        type="text" />
                    <span className="helper-txt">{stateObj.emailMessage}</span>
                </div>

                <div className={(!stateObj.passMessage ? 'user-input pass' : 'user-input error pass')}>
                    <label>Password</label>
                    <input name="password"
                        ref={password}
                        type="password" />
                    <span className="helper-txt">{stateObj.passMessage}</span>
                </div>

                {(loading || userSignIn)
                    ? <Loading done={userSignIn} loading={loading} />
                    : <button className="submit-btn" onClick={submitInput}>Sign In</button>}

                {error && <Loading error={error} />}

            </div>
        </>
    );
}