import React, { useRef, useState } from 'react';
import Validate from 'validate.js';
import './SignIn.css';
import './UserInput.css';
import DynamicIcon from '../Components/Helpers/DynamicIcon';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';

export default function SignIn() {
    const email = useRef(null);
    const password = useRef(null);
    const [showForgotPass, setShowForgotPass] = useState(false);
    const [userSignIn, serUserSignIn] = useState(false);

    const [stateObj, setMessage] = useState({
        emailMessage: null,
        passMessage: null,
        BEMessage: null
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

    const [callUserSignIn, { loading }] = useLazyQuery(USER_SIGN_IN, {
        onCompleted: data =>{
            serUserSignIn(data);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        },
        onError: ({ graphQLErrors }) => {
            setMessage({
                ...stateObj,
                BEMessage: graphQLErrors[0].message
            });
        }
    });

    const [callForgotPass, { data: userForgotPass }] = useMutation(USER_FORGOT_PASS);

    const handleFogotPass = e => {
        setShowForgotPass(!showForgotPass);
    };

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
            <div className={!(showForgotPass && userForgotPass && userForgotPass.forgotPwd) ? 'signin-main-div' : 'none'}>
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
                    ? (userSignIn
                        ? <DynamicIcon type='loadingDone' width='90' height='90' />
                        : <DynamicIcon type='loading' width='90' height='90' />)
                    : (
                        !showForgotPass
                            ? <button className="submit-btn" onClick={submitSignIn}>Sign In</button>
                            : <button className="submit-btn" onClick={submitForgotPass}>Send password reset email</button>
                    )}

                <div className={(userSignIn || loading ? 'none' : (showForgotPass ? 'btn-forgot-pass margin-cancel' : 'btn-forgot-pass margin-fp'))}
                    onClick={handleFogotPass}>
                    {showForgotPass ? 'Cancel' : 'Forgot password'}
                </div>

                <div className={stateObj.BEMessage ? 'div-error-msg' : 'none'}>
                    <DynamicIcon type='loadingError' width='50' height='50' />
                    <span>{stateObj.BEMessage}</span>
                </div>
            </div>

            <div className={showForgotPass && userForgotPass && userForgotPass.forgotPwd ? 'div-forgot-pass' : 'none'}>
                <DynamicIcon type="emailSent" width="160" height="160" />
                <span>Please check your email and click on the provided link to reset your password.</span>
            </div>
        </>
    );
}