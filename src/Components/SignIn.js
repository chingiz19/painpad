import React, { useRef, useState } from 'react';
import Validate from 'validate.js';
import './SignIn.css';
import './UserInput.css';
import Loading from '../Components/Helpers/Loading'
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import DynamicIcon from '../Components/Helpers/DynamicIcon'

export default function SignIn() {
    const email = useRef(null);
    const password = useRef(null);
    const [showForgotPass, setShowForgotPass] = useState(false);

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

    const USER_FORGOT_PASS = gql`
        mutation forgotPwd($email: String!){
            forgotPwd(email: $email)
        }
    `;

    const [callUserSignIn, { loading, error, data: userSignIn }] = useLazyQuery(USER_SIGN_IN);

    const [callForgotPass, { data: userForgotPass }] = useMutation(USER_FORGOT_PASS);

    if (userSignIn) {
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    const submitSignIn = e => {
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

    const handleFogotPass = e => {
        setShowForgotPass(!showForgotPass);
    };

    const submitForgotPass = e => {
        let check = Validate({
            email: email.current.value
        }, constraints);

        setMessage(prevState => {
            return {
                ...prevState,
                emailMessage: check && check.email ? "Please enter valid email" : null
            }
        });

        if (!check) {
            callForgotPass({
                variables: {
                    email: email.current.value
                }
            });
        }

    };

    return (
        <>
            <div className={ !(showForgotPass && userForgotPass && userForgotPass.forgotPwd) ? 'signin-main-div' : 'none'}>
                <div className={(!stateObj.emailMessage ? 'user-input' : 'user-input error')}>
                    <label>Email</label>
                    <input name="email"
                        ref={email}
                        type="text" />
                    <span className="helper-txt">{stateObj.emailMessage}</span>
                </div>

                <div className={(showForgotPass ? 'none' : (!stateObj.passMessage ? 'user-input pass' : 'user-input error pass'))}>
                    <label>Password</label>
                    <input name="password"
                        ref={password}
                        type="password" />
                    <span className="helper-txt">{stateObj.passMessage}</span>
                </div>

                {(loading || userSignIn)
                    ? <Loading done={userSignIn} loading={loading} />
                    : (
                        !showForgotPass
                        ? <button className="submit-btn" onClick={submitSignIn}>Sign In</button>
                        : <button className="submit-btn" onClick={submitForgotPass}>Send password reset email</button>
                    )}

                {error && <Loading error={error} />}

                <div className={(userSignIn || loading ? 'none' : (showForgotPass ? 'btn-forgot-pass margin-cancel' : 'btn-forgot-pass margin-fp'))}
                    onClick={handleFogotPass}>
                    {showForgotPass ? 'Cancel' : 'Forgot password'}
                </div>

            </div>

            <div className={ showForgotPass && userForgotPass && userForgotPass.forgotPwd ? 'div-forgot-pass' : 'none'}>
                <DynamicIcon type="emailSent" width="160" height="160" />
                <span>Please check your email and click on the provided link to reset your password.</span>
            </div>
        </>
    );
}