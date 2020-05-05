import React, { useState } from 'react';
import './ChangeUserPic.css';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';

export default function ChangePassword(props) {

    const [showModal, setShow] = useState(false);

    const [showRemove, setShowRemove] = useState(false);
    const [imageUploader, setImageUploader] = useState('');
    const [uploadedImg, setUploadedImg] = useState('');

    const handleClose = () => {
        setShow(false);
    }

    const handleYes = () => {
        setShow(true);
    }

    const handleRemove = () => {
        setUploadedImg(props.userPic);
        setShowRemove(false);
    }


    const handleImageUpload = e => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                setUploadedImg(e.target.result)
            };
            reader.readAsDataURL(file);
            setShowRemove(true);
            setImageUploader('');
        }
    };

    const submitImg = () => {

        //BE submit goes here
    }

    return (
        <>
            <button className="btn-edit-pic picture-btn" onClick={handleYes}>Edit</button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <h3>Change photo</h3>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="CP-body">

                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <input
                                id="image-upload"
                                type="file"
                                accept="image/png, image/jpeg"
                                className="none"
                                value={imageUploader}
                                onChange={handleImageUpload}
                            />
                            <div className="div-uploaded">
                                <img
                                    alt="loaded"
                                    src={uploadedImg || props.userPic}
                                />
                            </div>
                        </div>

                        {!showRemove
                            ? <button className="btn-choose-pic" onClick={() => document.getElementById("image-upload").click()}>Choose photo</button>
                            : <button className="btn-upload-pic" onClick={submitImg}>Upload photo</button>}

                        <button className={(showRemove ? 'btn-remove' : 'none')} onClick={handleRemove}>X</button>

                        {/* {(loadingPostUserPwd || dataPostUserPwd)
                            ? <Loading done={dataPostUserPwd} loading={loadingPostUserPwd}/>
                            : <button className="submit-btn" onClick={updatePassword}>Update</button>}

                        {errorPostUserPwd && <Loading error={errorPostUserPwd} />} */}

                    </InputGroup>
                </Modal.Body>
            </Modal>
        </>
    );
}
