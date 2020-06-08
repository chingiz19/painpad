import React, { useState, useRef } from 'react';
import './ResetPass.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderWeb from '../../Components/HeaderWeb';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import DynamicIcon from '../../Components/Helpers/DynamicIcon';
import Validate from 'validate.js';
import Loading from '../../Components/Helpers/Loading';

export default function ResetPass(props) {
    let token = window.location.href.split("resetPass/")[1];

    let newPassword = useRef(null);
    let newPassword2 = useRef(null);

    const [stateObj, setMessage] = useState({
        newPassMessage: null,
        newPass2Message: null,
        errorMessage: null
    });

    const constraints = {
        newPassword: {
            length: {
                minimum: 6
            }
        },
        newPassword2: {
            length: {
                minimum: 6
            }
        }
    };

    const POST_RESET_PWD = gql`
        mutation resetPwd($newPwd: String!, $token: String!){
            resetPwd(
                newPwd: $newPwd,
                token: $token
            )
        }
    `;

    const [callPostResetPwd, { data: dataPostResetPwd, loading: loadingPostResetPwd }] = useMutation(POST_RESET_PWD, {
        onCompleted: data => {
            if (data && data.resetPwd) {
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            }
        },
        onError: ({ graphQLErrors }) => {
            if (graphQLErrors) {
                setMessage({
                    ...stateObj,
                    errorMessage: graphQLErrors[0].message
                });
            }
        }
    });


    const resetPassword = e => {
        let check = Validate({
            newPassword: newPassword.current.value,
            newPassword2: newPassword2.current.value
        }, constraints);

        setMessage(prevState => {
            return {
                ...prevState,
                newPassMessage: check && check.newPassword ? "Minimum 6 characters or more" : null,
                newPass2Message: check && check.newPassword2 ? "Minimum 6 characters or more" : null
            }
        });

        if (newPassword.current.value !== newPassword2.current.value) {
            setMessage(prevState => {
                return {
                    ...prevState,
                    newPass2Message: "New passwords don't match"
                }
            });
            return;
        };

        if (!check) {
            callPostResetPwd({
                variables: {
                    newPwd: newPassword.current.value,
                    token: token
                }
            });
        }

    };

    return (
        <>
            <Container className="view-port">
                <Container fluid="lg">
                    <Row>
                        <Col sm={4} md={3} className="header-comp">
                            <HeaderWeb currentPage={props.pageName} isSignedIn={false} />
                        </Col>
                        <Col sm={8} md={9} className="main-comp">
                            <div className="main reset-pass-main">
                                <div className="div-icon">
                                    {stateObj.errorMessage
                                        ? <Loading error={stateObj.errorMessage} width="220" height="220" />
                                        : <DynamicIcon type="resetPass" width="220" height="220" />}
                                    <span>{stateObj.errorMessage ? stateObj.errorMessage : 'Reset Password'}</span>
                                </div>
                                <div className="div-input">
                                    <div className={(!stateObj.newPassMessage ? 'user-input password' : 'user-input error password')}>
                                        <label>New password</label>
                                        <input name="user-email"
                                            ref={newPassword}
                                            type="password" />
                                        <span className="helper-txt">{stateObj.newPassMessage}</span>
                                    </div>

                                    <div className={(!stateObj.newPass2Message ? 'user-input password' : 'user-input error password')}>
                                        <label>Confirm password</label>
                                        <input name="user-email"
                                            ref={newPassword2}
                                            type="password" />
                                        <span className="helper-txt">{stateObj.newPass2Message}</span>
                                    </div>

                                    {(loadingPostResetPwd || dataPostResetPwd)
                                        ? <Loading loading={loadingPostResetPwd} done={dataPostResetPwd} />
                                        : <button className="submit-btn" onClick={resetPassword}>Reset password</button>}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}