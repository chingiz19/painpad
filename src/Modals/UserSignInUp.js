import React, { useState } from 'react';
import './UserSignInUp.css';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';

export default function UserSignUpIn(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const handleYes = () => {
        setShow(true);
    }

    return (
        <>
            <div onClick={handleYes} className="user-sign-div">
                <span>{props.name}</span>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>We are grateful for any feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup style={{ margin: "5px" }}>
                        <FormControl as="textarea" aria-label="With textarea"/>
                        <Button variant="primary" type="submit" >
                            Submit
                        </Button>
                    </InputGroup>
                </Modal.Body>
            </Modal>
        </>
    );
}
