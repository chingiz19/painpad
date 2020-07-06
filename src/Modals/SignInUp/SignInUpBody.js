import React, { useState } from 'react';
import SignIn from '../../Components/SignIn'
import SignUp from '../../Components/SignUp'
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';

export default function SignInUpBody(props) {
    const [showSignIn, setShowSignIn] = useState(props.showSingUp ? false : true);

    const handkeSignIn = () => {
        setShowSignIn(true);
    }

    const handkeSignUp = () => {
        setShowSignIn(false);
    }

    return (
        <>
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
        </>
    );
}
