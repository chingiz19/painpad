import React, { useRef, useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import Validate from 'validate.js';
import './HomeComponents.css';
import Locations from '../../../Components/Lists/Locations'
import Indsutries from '../../../Components/Lists/Industries'
import DynamicIcon from '../../../Components/Helpers/DynamicIcon';
import UserSignInUp from '../../../Modals/SignInUp/SignInUp';

export default function Post(props) {
    const reportText = useRef(null);

    const [showSignModal, setSignModal] = useState(false);
    const [charCount, setCharCount] = useState(160);
    const [postSent, setPostSent] = useState(false);
    const [industry, setIndustry] = useState(null);
    const [city, setCity] = useState(null);

    const [stateObj, setMessage] = useState({
        industryMessage: null,
        cityMessage: null,
        reportTextMessage: null
    });

    const constraints = {
        industry: {
            presence: { allowEmpty: false }
        },
        city: {
            presence: { allowEmpty: false }
        },
        reportText: {
            format: {
                pattern: "[a-zA-Z0-9.:());+-?!# ]+"
            }
        }
    };

    const USER_NEW_POST = gql`
        mutation post($description: String!, $cityId: ID!, $industryId: ID!){
            post(
                description: $description,
                cityId: $cityId,
                industryId: $industryId
            )
        }
    `;

    const [callNewPost, { loading: loadingNewPost, error: errorNewPost }] = useMutation(USER_NEW_POST, {
        onCompleted: data => {
            setPostSent(true);
        },
        onError: ({ graphQLErrors }) => {
            setSignModal(true);
        }
    });

    const sendReport = e => {
        if (!props.isLogin) {
            setSignModal(true);
            return;
        }

        let check = Validate({
            industry: industry,
            city: city,
            reportText: reportText.current.value
        }, constraints);

        setMessage(prevState => {
            return {
                ...prevState,
                industryMessage: check && check.industry ? "Required" : null,
                cityMessage: check && check.city ? "Required" : null,
                reportTextMessage: check && check.reportText ? "Ups..Doesn't look like a valid post. Characters can be used (.:;+-?!#)" : null
            }
        });

        if (!check) {
            callNewPost({
                variables: {
                    description: reportText.current.value,
                    cityId: parseInt(city.locationId),
                    industryId: parseInt(industry.industryId)
                }
            });
        }

    }

    function handleInputChange(event) {
        setCharCount(160 - event.target.value.length);
    }

    function handleChangeIndustry(newValue) {
        setIndustry(newValue[0]);
    }

    function handleChangeCity(newValue) {
        setCity(newValue[0]);
    }

    function handleCloseModal() {
        setSignModal(false);
    }

    function addAutoResize() {
        document.querySelectorAll('[data-autoresize]').forEach(function (element) {
            element.style.boxSizing = 'border-box';
            var offset = element.offsetHeight - element.clientHeight;
            element.addEventListener('input', function (event) {
                event.target.style.height = 'auto';
                event.target.style.height = event.target.scrollHeight + offset + 'px';
            });
            element.removeAttribute('data-autoresize');
        });
    }

    addAutoResize();

    return (
        <>
            <div className="write-report-main">
                <div className="wr-ln-1">
                    <textarea data-autoresize
                        className="wr-textarea"
                        maxLength="160"
                        cols="52"
                        rows="2"
                        placeholder="Share your 'pain'.."
                        ref={reportText}
                        onChange={handleInputChange}></textarea>
                    <span className={stateObj.reportTextMessage ? 'show-error' : 'hide-error'}>{stateObj.reportTextMessage}</span>
                    <span className={charCount > 99 ? 'none' : (charCount > 19 ? 'char-count cc-99' : 'char-count cc-19')}>{charCount}</span>
                </div>
                <div className="wr-ln-2">
                    <div className="wr-list-div">
                        <div className="combo-industry">
                            <Indsutries helperText={stateObj.industryMessage}
                                onChange={handleChangeIndustry}
                                thisClassName="autocomplete"
                                thisPlaceholder="Industry" />
                        </div>
                        <div className="combo-city">
                            <Locations helperText={stateObj.cityMessage}
                                onChange={handleChangeCity}
                                thisClassName="autocomplete"
                                thisPlaceholder="Location" />
                        </div>
                    </div>
                    <UserSignInUp withButton={false}
                        showModal={showSignModal}
                        handleCloseModal={handleCloseModal} />

                    {(loadingNewPost || errorNewPost)
                        ? <DynamicIcon type={loadingNewPost ? 'loading' : 'loadingError'} width='50' height='50' />
                        : <button className={reportText && reportText.current && reportText.current.value ? 'btn-report' : 'btn-report no-txt'} onClick={sendReport} disabled={postSent}>{postSent ? 'Posted' : 'Post'}</button>}

                </div>
            </div>
            <div className={postSent ? 'post-message' : 'none'}>
                <span>Yahoo! Now the post is on its way to moderators for review. It won't take long. <a href={'/users/' + props.userId}>See 'My profile'.</a></span>
            </div>
        </>
    );
}