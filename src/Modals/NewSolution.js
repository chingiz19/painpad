import React, { useState, useRef } from 'react';
import './NewSolution.css';
import gql from 'graphql-tag';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Validate from 'validate.js';
import SolutionLogo from './Components/SolutionLogo';
import axios from 'axios';
import getCroppedImg from '../Components/Helpers/CropImage';
import imageCompression from 'browser-image-compression';
import Loading from '../Components/Helpers/Loading';
import GoogleAnalytics from '../Components/Helpers/GoogleAnalytics';

export default function NewSolution(props) {
    const [showModal, setShow] = useState(false);
    const [showDesc, setShowDesc] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingComplete, setLoadingComplete] = useState(false);

    const [imageName, setImageName] = useState(false);
    const [imageType, setImageType] = useState(false);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(false);
    const [croppedImage, setCroppedImage] = useState(false);

    const name = useRef(null);
    const website = useRef(null);
    const desc = useRef(null);

    const [stateObj, setMessage] = useState({
        nameMessage: null,
        descMessage: null
    });

    const constraints = {
        name: {
            presence: { allowEmpty: false }
        },
        desc: {
            format: {
                pattern: /[A-Za-z0-9 '’.,():;+-?!#]+/
            }
        }
    };

    const POST_NEW_SOLUTION = gql`
        mutation addSolution($postId: ID!, $logo: String, $name: String!, $website: String, $description: String) {
            addSolution(
                postId: $postId,
                logo: $logo,
                name: $name,
                website: $website,
                description: $description
            )
        }
    `;

    const GET_SIGNS3 = gql`
        query signS3($fileName: String!, $fileType: String!) {
            signS3(
                fileName: $fileName,
                fileType: $fileType
        ){uploadUrl, fileUrl}}
    `;

    const [callGetSignS3] = useLazyQuery(GET_SIGNS3, {
        onCompleted: data => {
            //Step 6 - initiate upload to AWS
            var options = {
                headers: {
                    'Content-Type': imageType
                }
            };
            axios.put(data.signS3.uploadUrl, croppedImage, options)
                .then(result => {
                    //Step 7 - update stored user photo URL in BE 
                    addSolution_2(data.signS3.fileUrl);
                })
                .catch(error => {
                    if (Object.keys(error).length > 0)
                        console.error("ERROR UPLOADING USER PHOTO", error);
                })
        }
    });

    const [callAddNewSolution] = useMutation(POST_NEW_SOLUTION, {
        onCompleted: data => {
            setLoading(false);
            setLoadingComplete(data.addSolution);
            setTimeout(() => {
                window.location.reload();
            }, 2000);

            let objGA = {
                category: `Post Page Actione`,
                action: `Solution Added`
            };
            GoogleAnalytics('', objGA);
        }
    });

    const handleClose = () => {
        setShow(false);
    }

    const showAddSolution = () => {
        setShow(true);

        let objGA = {
            category: `Post Page Actione`,
            action: `Add Solution clicked`
        };
        GoogleAnalytics('', objGA);
    }

    function handleShowDesc() {
        setShowDesc(!showDesc);
    }

    function handleOnLogoUpload(name, type, cropArea, image) {
        name && setImageName(name);
        type && setImageType(type);
        cropArea && setCroppedAreaPixels(cropArea);
        image && setUploadedImage(image);
    }

    const addSolution_1 = async () => {
        let check = Validate({
            name: name && name.current.value,
            desc: desc && desc.current.value
        }, constraints);

        const nameMessage = (check && check.name) ? "Required" : null;
        const descMessage = !(desc && desc.current.value) ? null : (check && check.desc ? "Ups..Doesn't look like a valid description" : null);

        setMessage(prevState => {
            return {
                ...prevState,
                nameMessage: nameMessage,
                descMessage: descMessage
            }
        });

        if (!nameMessage && !descMessage) {
            setLoading(true);
            if (imageName && imageType) {

                const compressOptions = {
                    maxSizeMB: 0.05,
                    maxWidthOrHeight: 150,
                    useWebWorker: true,
                    onProgress: (() => true)
                }
                try {
                    //Step 3 - initiate upload by cropping image
                    const croppedImage = await getCroppedImg(
                        uploadedImage,
                        croppedAreaPixels
                    )
                    try {
                        //Step 4 - compress cropped image
                        const compressedFile = await imageCompression(croppedImage, compressOptions);
                        setCroppedImage(compressedFile);
                        //Step 5 - call BE to get Upload URL to AWS
                        callGetSignS3({
                            variables: {
                                fileName: imageName,
                                fileType: imageType
                            }
                        });
                    } catch (error) {
                        console.log(error);
                    }
                } catch (e) {
                    console.error(e)
                }
            } else {
                addSolution_2();
            }
        }
    }

    function addSolution_2(S3_URL) {
        callAddNewSolution({
            variables: {
                postId: parseInt(props.post.id),
                logo: S3_URL,
                name: name && name.current.value,
                website: website && website.current.value,
                description: desc && desc.current.value
            }
        });
    }

    return (
        <>
            <button onClick={showAddSolution} className={!props.post ? 'none' : 'btn-ns'}>+ Add Solution</button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <h3>Add Solution</h3>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="body-NS">
                        <div className="div-main">
                            <SolutionLogo onUpload={handleOnLogoUpload} />
                            <div className={(!stateObj.nameMessage ? 'user-input' : 'user-input error')}>
                                <label>Name</label>
                                <input name="name"
                                    ref={name}
                                    type="text" />
                                <span className="helper-txt">{stateObj.nameMessage}</span>
                            </div>

                            <div className={(!stateObj.websiteMessage ? 'user-input' : 'user-input error')}>
                                <label>Website</label>
                                <input name="website"
                                    ref={website}
                                    type="text" />
                                <span className="helper-txt">{stateObj.websiteMessage}</span>
                            </div>

                            <div className="desc">
                                <label className="pp-checkbox">
                                    <input type="checkbox"
                                        checked={showDesc}
                                        onChange={handleShowDesc} />
                                    <span>Description</span>
                                </label>
                                <div className={showDesc ? 'div-textarea post' : 'none'}>
                                    <textarea className="textarea"
                                        maxLength="160"
                                        rows="3"
                                        ref={desc}></textarea>
                                    <span className={stateObj.descMessage ? 'show-error' : 'hide-error'}>{stateObj.descMessage}</span>
                                </div>
                            </div>

                            {loading || loadingComplete
                                ? <Loading done={loadingComplete} loading={loading} />
                                : <button className="btn-add" onClick={addSolution_1}>Add</button>
                            }
                        </div>
                    </InputGroup>
                </Modal.Body>
            </Modal>
        </>
    );
}
