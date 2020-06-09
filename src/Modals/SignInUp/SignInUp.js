import React, { useState } from 'react';
import './SignInUp.css';
import Modal from 'react-bootstrap/Modal';
import ActivateButton from './ActivateButton';
import SignInUpBody from './SignInUpBody';

export default function UserSignUpIn(props) {
    const [showModal, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const activateModal = () => {
        setShow(true);
    }

    return (
        <>
            <ActivateButton withButton={props.withButton} 
                handleActivateModal={activateModal}/>
            <Modal show={props.withButton ? showModal : props.showModal} onHide={props.withButton ? handleClose : props.handleCloseModal}>
                <SignInUpBody/>
            </Modal>
        </>
    );
}
