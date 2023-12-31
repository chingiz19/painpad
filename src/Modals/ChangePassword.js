import React, { useState, useRef } from 'react';
import './ChangePassword.css';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loading from '../Components/Helpers/Loading'
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Validate from 'validate.js';
import GoogleAnalytics from '../Components/Helpers/GoogleAnalytics';

export default function ChangePassword(props) {
    const [showModal, setShow] = useState(false);

    let oldPassword = useRef(null);
    let newPassword = useRef(null);
    let newPassword2 = useRef(null);

    const [stateObj, setMessage] = useState({
        oldPassMessage: null,
        newPassMessage: null,
        newPass2Message: null
    });

    const constraints = {
        oldPassword: {
            length: {
                minimum: 6
            }
        },
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

    const POST_USER_PWD = gql`
        mutation changePwd($oldPwd: String!, $newPwd: String!){
            changePwd(
                oldPwd: $oldPwd,
                newPwd: $newPwd
            )
        }
    `;

    const [callPostUserPwd, { data: dataPostUserPwd, loading: loadingPostUserPwd, error: errorPostUserPwd }] = useMutation(POST_USER_PWD);

    if (dataPostUserPwd && dataPostUserPwd.changePwd) {
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    const handleClose = () => {
        setShow(false);
    }

    const showChangePwd = () => {
        if (props.showEdit) {
            setShow(true);
        }

        let objGA={
            category: "User Account",
            action: "Show Change Password clicked"
        };
        GoogleAnalytics('', objGA);
    }

    const updatePassword = e => {
        let check = Validate({
            oldPassword: oldPassword.current.value,
            newPassword: newPassword.current.value,
            newPassword2: newPassword2.current.value
        }, constraints);

        setMessage(prevState => {
            return {
                ...prevState,
                passMessage: check && check.oldPassword ? "Minimum 6 characters or more" : null,
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
        }

        if (!check) {
            callPostUserPwd({
                variables: {
                    oldPwd: oldPassword.current.value,
                    newPwd: newPassword.current.value
                }
            });
        }

        let objGA={
            category: "User Account",
            action: "Update Password clicked"
        };
        GoogleAnalytics('', objGA);
    };

    return (
        <>
            <div onClick={showChangePwd} className={(props.isMyProfile ? (props.showEdit ? 'CP edit-false' : 'CP edit-true') : 'none')}>
                <i className="fas fa-lock"></i>
                <span>Change password</span>
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <h3>Change password</h3>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="CP-body">
                        <div className={(!stateObj.passMessage ? 'user-input password' : 'user-input error password')}>
                            <label>Old password</label>
                            <input name="user-email"
                                ref={oldPassword}
                                type="password" />
                            <span className="helper-txt">{stateObj.oldPassMessage}</span>
                        </div>

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

                        {(loadingPostUserPwd || dataPostUserPwd)
                            ? <Loading done={dataPostUserPwd} loading={loadingPostUserPwd} />
                            : <button className="submit-btn" onClick={updatePassword}>Update</button>}

                        {errorPostUserPwd && <Loading error={errorPostUserPwd} />}
                    </InputGroup>
                </Modal.Body>
            </Modal>
        </>
    );
}
