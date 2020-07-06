import React, { useState } from 'react';
import './SignInUp.css';
import Modal from 'react-bootstrap/Modal';
import ActivateButton from './ActivateButton';
import SignInUpBody from './SignInUpBody';
import GoogleAnalytics from '../../Components/Helpers/GoogleAnalytics';

export default function UserSignUpIn(props) {
    const [showModal, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const activateModal = () => {
        setShow(true);

        let objGA={
            category: "Sign Action",
            action: "Sign In/Up clicked"
        };
        GoogleAnalytics('', objGA);
    }

    return (
        <>
            <ActivateButton withButton={props.withButton} 
                handleActivateModal={activateModal}
                text={props.text}/>
            <Modal show={props.withButton ? showModal : props.showModal} onHide={props.withButton ? handleClose : props.handleCloseModal}>
                <SignInUpBody showSingUp={props.showSingUp}/>
            </Modal>
        </>
    );
}
