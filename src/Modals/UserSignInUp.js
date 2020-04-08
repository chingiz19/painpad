import React, { useState } from 'react';
import './UserSignInUp.css';
import SignIn from '../Components/SignIn'
import SignUp from '../Components/SignUp'
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';

export default function UserSignUpIn(props) {
    const [showModal, setShow] = useState(false);
    const [showSignIn, setShowSignIn] = useState(true);

    const handleClose = () => {
        setShow(false);
    }

    const handleYes = () => {
        setShow(true);
    }

    const handkeSignIn = () => {
        setShowSignIn(true);
    }

    const handkeSignUp = () => {
        setShowSignIn(false);
    }

    return (
        <>
            <div onClick={handleYes} className="user-sign-div">
                <span>{props.name}</span>
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <div className="header-btn-div">
                        <button onClick={handkeSignIn} className={(showSignIn ? 'selected' : '')}>Sign In</button>
                        <span>/</span>
                        <button onClick={handkeSignUp} className={(!showSignIn ? 'selected' : '')}>Sign Up</button>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="sign-in-body">
                        <div className="sign-comp-div" style={{ display: showSignIn ? 'flex' : 'none' }}>
                            <SignIn />
                        </div>
                        <div className="sign-comp-div" style={{ display: !showSignIn ? 'flex' : 'none' }}>
                            <SignUp />
                        </div>
                    </InputGroup>
                </Modal.Body>
            </Modal>
        </>
    );
}
