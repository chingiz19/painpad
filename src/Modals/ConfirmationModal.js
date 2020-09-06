import React, { useState } from 'react';
import './ConfirmationModal.css';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import DeletePost from './Confirmations/DeletePost';
import DeleteSolution from './Confirmations/DeleteSolution';
import GoogleAnalytics from '../Components/Helpers/GoogleAnalytics';

export default function ConfirmationModal(props) {
    const [showModal, setShow] = useState(false);

    const handleYes = () => {
        setShow(true);

        let objGA={
            category: "Problem Action",
            action: "Show Delete Post Modal clicked"
        };
        GoogleAnalytics('', objGA);
    }

    const handleClose = () => {
        setShow(false);
    }

    return (
        <>
            <button className={props.showButton && props.editPosts ? 'btn-remove-post' : 'none'} onClick={handleYes}>
                <i className="far fa-trash-alt"></i>
            </button>
            <Modal show={showModal} onHide={handleClose} className="modal-confirm">
                <Modal.Header closeButton className="CM-header">
                    <h3>{props.header}</h3>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="CM-body">
                        <DeletePost show={props.type === 'deletePost'} postId={props.postId}/>
                        <DeleteSolution show={props.type === 'deleteSolution'} solutionId={props.solutionId}/>
                    </InputGroup>
                </Modal.Body>
            </Modal>
        </>
    );
}
