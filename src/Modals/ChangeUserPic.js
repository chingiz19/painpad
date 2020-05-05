import React, { useState, useCallback } from 'react';
import './ChangeUserPic.css';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Cropper from 'react-easy-crop'
import getCroppedImg from '../Components/Helpers/CropImage'
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import axios from 'axios';
import Loading from '../Components/Loading'

export default function ChangePassword(props) {

    const [showModal, setShow] = useState(false);

    const [showRemove, setShowRemove] = useState(false);
    const [imageUploader, setImageUploader] = useState('');
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const [croppedImage, setCroppedImage] = useState('');
    const [imageType, setImageType] = useState('');
    const [imageName, setImageName] = useState('');
    const [imageLoading, setImageLoading] = useState(false);

    const [cropObj, setCropObj] = useState({
        image: props.userPic,
        crop: { x: 0, y: 0 },
        zoom: 1.2,
        aspect: 4 / 4
    });

    const GET_SIGNS3 = gql`
            query signS3($fileName: String!, $fileType: String!) {
                signS3(
                    fileName: $fileName,
                    fileType: $fileType
            ){uploadUrl, fileUrl}}
        `;

    const POST_USER_INFO = gql`
            mutation changeprofile($profilePic: String!){
                changeProfile(
                    profilePic: $profilePic
                )
            }
        `;

    const [callPostUserInfo, { data: dataPostUserInfo }] = useMutation(POST_USER_INFO, {
        onCompleted: data => {
            setImageLoading(false);
            setTimeout(() => {
                window.location.reload();
            }, 2200);
        }
    });

    let [callGetSignS3] = useLazyQuery(GET_SIGNS3, {
        onCompleted: data => {
            var options = {
                headers: {
                    'Content-Type': imageType
                }
            };
            axios.put(data.signS3.uploadUrl, croppedImage, options)
                .then(result => {
                    callPostUserInfo({
                        variables: {
                            profilePic: data.signS3.fileUrl
                        }
                    });
                })
                .catch(error => {
                    if (Object.keys(error).length > 0)
                        console.error("ERROR UPLOADING USER PHOTO", error);
                })
        }
    });

    const handleClose = () => {
        setShow(false);
    }

    const handleYes = () => {
        setShow(true);
    }

    const handleRemove = () => {
        setShowRemove(false);
    }

    const onCropChange = crop => {
        setCropObj({
            ...cropObj,
            crop: crop
        });
    }

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const uploadPhoto = useCallback(async () => {
        try {
            setImageLoading(true);
            const croppedImage = await getCroppedImg(
                cropObj.image,
                croppedAreaPixels
            )
            setCroppedImage(croppedImage);
            callGetSignS3({
                variables: {
                    fileName: imageName,
                    fileType: imageType
                }
            });

        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels])

    const onZoomChange = zoom => {
        setCropObj({
            ...cropObj,
            zoom: zoom
        });
    }

    const handleImageUpload = e => {
        const [file] = e.target.files;

        setImageType(file.name.split('.')[1]);
        setImageName((props.userId * 583).toString());

        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                setCropObj({
                    ...cropObj,
                    image: e.target.result
                });
            };
            reader.readAsDataURL(file);
            setShowRemove(true);
            setImageUploader('');
        }
    };

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

                            <div className={(!showRemove ? 'div-current' : 'none')}>
                                <img
                                    alt="current"
                                    src={props.userPic}
                                />
                            </div>

                            <div className={(showRemove ? 'div-crop' : 'none')}>
                                <Cropper
                                    image={cropObj && cropObj.image}
                                    crop={cropObj && cropObj.crop}
                                    zoom={cropObj && cropObj.zoom}
                                    aspect={cropObj && cropObj.aspect}
                                    onCropChange={onCropChange}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={onZoomChange}
                                    cropShape="round"
                                />
                            </div>
                        </div>

                        {!showRemove
                            ? <button className="btn-choose-pic" 
                                onClick={() => document.getElementById("image-upload").click()}>Choose photo</button>
                            : (
                                (imageLoading || dataPostUserInfo)
                                    ? <Loading done={dataPostUserInfo} loading={imageLoading} />
                                    : <button className="btn-upload-pic" onClick={uploadPhoto}>Upload photo</button>
                            )
                        }

                        <button className={((showRemove && !imageLoading && !dataPostUserInfo) ? 'btn-remove' : 'none')} 
                            onClick={handleRemove}>X</button>
                    </InputGroup>
                </Modal.Body>
            </Modal>
        </>
    );
}
