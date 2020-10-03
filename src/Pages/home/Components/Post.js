import React, { useRef, useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import Validate from 'validate.js';
import './HomeComponents.css';
import Locations from '../../../Components/Lists/Locations';
import DynamicIcon from '../../../Components/Helpers/DynamicIcon';
import UserSignInUp from '../../../Modals/SignInUp/SignInUp';
import GoogleAnalytics from '../../../Components/Helpers/GoogleAnalytics';

import Topics from '../../../Components/Lists/Topics';

export default function Post(props) {
    let placeholder = props.userId && (props.userInfo && props.userInfo.firstName ? 'Have painful experience, ' + props.userInfo.firstName + '?': 'Have painful experience to share?');
    const reportText = useRef(null);

    const [showSignModal, setSignModal] = useState(false);
    const [charCount, setCharCount] = useState(160);
    const [postSent, setPostSent] = useState(false);
    const [topic, setTopic] = useState(null);
    const [city, setCity] = useState(null);

    const [stateObj, setMessage] = useState({
        topicMessage: null,
        cityMessage: null,
        reportTextMessage: null
    });

    const constraints = {
        topic: {
            presence: { allowEmpty: false }
        },
        city: {
            presence: { allowEmpty: false }
        },
        reportText: {
            format: {
                pattern: /[A-Za-z0-9 '’.,():;+-?!#]+/
            },
            length: {
                minimum: 20
            }
        }
    };

    const USER_NEW_POST = gql`
        mutation post($description: String!, $cityId: ID!, $topicId: ID!){
            post(
                description: $description,
                cityId: $cityId,
                topicId: $topicId
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

    const sendPost = e => {
        if (!props.isLogin) {
            setSignModal(true);
            return;
        }
        let check = Validate({
            topic: topic,
            city: city,
            reportText: reportText.current.value
        }, constraints);
        setMessage(prevState => {
            return {
                ...prevState,
                topicMessage: check && check.topic ? "Required" : null,
                cityMessage: check && check.city ? "Required" : null,
                reportTextMessage: check
                    ? (
                        check.reportText[0].includes('minimum')
                            ? "Hmm..Looks like the post is too short"
                            : "Ups..Doesn't look like a valid post. Characters can be used (.:;,'+-?!#)")
                    : null
            }
        });
        if (!check) {
            callNewPost({
                variables: {
                    description: reportText.current.value,
                    cityId: parseInt(city.locationId),
                    topicId: parseInt(topic.value)
                }
            });
        }

        let objGA = {
            category: "Write Post Action",
            action: "Send Post clicked"
        };
        GoogleAnalytics('', objGA);
    }

    function handleInputChange(event) {
        if (!props.isLogin) {
            setSignModal(true);
            return;
        } else{
            setCharCount(160 - event.target.value.length);
        }
    }

    function handleChangeTopic(newValue) {
        setTopic(newValue);
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

    function analytics() {
        let objGA = {
            category: "Write Post Action",
            action: "View My Profile clicked"
        };
        GoogleAnalytics('', objGA);

        window.location.href = '/users/' + props.userId;
    }

    addAutoResize();

    return (
        <>
            <div className="write-report-main">
                <div className="wr-ln-1">
                    <textarea data-autoresize
                        className="wr-textarea"
                        maxLength="160"
                        rows="1"
                        // placeholder='Have painful experience to share?'
                        placeholder={placeholder}
                        ref={reportText}
                        onChange={handleInputChange}></textarea>
                    <span className={stateObj.reportTextMessage ? 'show-error' : 'hide-error'}>{stateObj.reportTextMessage}</span>
                    <span className={charCount > 99 ? 'none' : (charCount > 19 ? 'char-count cc-99' : 'char-count cc-19')}>{charCount}</span>
                </div>
                <div className="wr-ln-2">
                    <div className="wr-list-div">
                        <div className="combo-topic">
                            <Topics onChange={handleChangeTopic}
                                helperText={stateObj.topicMessage}/>
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
                        : <button className={(reportText && reportText.current && reportText.current.value) || topic || city ? 'btn-report' : 'btn-report no-txt'} onClick={sendPost} disabled={postSent}>{postSent ? 'Posted' : 'Post'}</button>}

                </div>
            </div>
            <div className={postSent ? 'post-message' : 'none'}>
                <div>Yahoo! Now the post is on its way to moderators for review. It won't take long. See<span onClick={analytics}> 'My profile'.</span></div>
            </div>
        </>
    );
}