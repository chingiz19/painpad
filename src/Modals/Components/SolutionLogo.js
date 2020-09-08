import React, { useState } from 'react';
import '../NewSolution.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Cropper from 'react-easy-crop';

export default function SolutionLogo(props) {
    const [showRemove, setShowRemove] = useState(false);
    const [imageUploader, setImageUploader] = useState('');
    // const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const [imageUploadMsg, setImageUploadMsg] = useState('');

    const [cropObj, setCropObj] = useState({
        crop: { x: 0, y: 0 },
        cropSize: { width: 100, height: 100 },
        zoom: 1.2,
        aspect: 4 / 4
    });

    const handleRemove = () => {
        setShowRemove(false);
    }

    const onCropChange = crop => {
        setCropObj({
            ...cropObj,
            crop: crop
        });
    }

    const onZoomChange = zoom => {
        setCropObj({
            ...cropObj,
            zoom: zoom
        });
    }

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        // setCroppedAreaPixels(croppedAreaPixels)
        props.onUpload(null, null, croppedAreaPixels, null);
    };

    const handleImageUpload = e => {
        const d = new Date();
        const [file] = e.target.files;
        const fileType = file.name.split('.')[1];
        const fileName = (d.getTime()).toString();

        //Step 1 - check if image size smaller than 2MB
        if (file.size > 2000000) {
            setImageUploadMsg("Maxium file size 2 MB.");
            return;
        } else {
            setImageUploadMsg("");
        }
        if (file) {
            const reader = new FileReader();
            //Step 2 - load image
            reader.onload = e => {
                setCropObj({
                    ...cropObj,
                    image: e.target.result
                });
                props.onUpload(fileName, fileType, null, e.target.result);
            };
            reader.readAsDataURL(file);
            setShowRemove(true);
            setImageUploader('');
        }
    };

    return (
        // SL - Solution Logo
        <InputGroup className="SL-body CP-body">
            <div className="body-image-upload">
                <input
                    id="image-upload"
                    type="file"
                    accept="image/png, image/jpeg"
                    className="none"
                    value={imageUploader}
                    onChange={handleImageUpload}
                />

                <div className={(!showRemove ? 'div-current' : 'none')} onClick={() => document.getElementById("image-upload").click()}>
                    <img
                        className={showRemove ? '' : 'none'}
                        alt="current"
                    />
                    <span>+ Logo</span>
                </div>

                <div className={(showRemove ? 'div-crop' : 'none')}>
                    <Cropper
                        image={cropObj && cropObj.image}
                        crop={cropObj && cropObj.crop}
                        zoom={cropObj && cropObj.zoom}
                        aspect={cropObj && cropObj.aspect}
                        cropSize={cropObj && cropObj.cropSize}
                        onCropChange={onCropChange}
                        onCropComplete={onCropComplete}
                        onZoomChange={onZoomChange}
                        cropShape="round"
                    />
                </div>
            </div>

            <span className={imageUploadMsg ? 'error-msg' : 'none'}>{imageUploadMsg}</span>
            <button className={showRemove ? 'btn-remove' : 'none'} onClick={handleRemove}>X</button>
        </InputGroup>
    );
}
