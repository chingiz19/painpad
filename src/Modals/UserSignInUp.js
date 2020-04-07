import React, { useState } from 'react';
import './UserSignInUp.css';
import SignIn from '../Components/SignIn'
import SignUp from '../Components/SignUp'
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';

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
                    <div>
                        <button onClick={handkeSignIn}>Sign In</button>
                        <button onClick={handkeSignUp}>Sign Up</button>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="sign-in-body">
                        <FormControl as="textarea" aria-label="With textarea"/>
                        <div style={{ display: showSignIn ? 'block' : 'none' }}>
                            <SignIn/>
                        </div>
                        <div style={{ display: !showSignIn ? 'block' : 'none' }}>
                            <SignUp/>
                        </div>
                        <Button variant="primary" type="submit" >
                            Submit
                        </Button>
                    </InputGroup>
                </Modal.Body>
            </Modal>
        </>
    );
}
