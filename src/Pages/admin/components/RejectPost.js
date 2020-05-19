import React, { useRef, useState } from 'react';
import './AdminComponents.css';
import PendingProblem from '../../../Components/reactMaps/PendingProblem';
import RejectReasons from '../../../Components/Lists/RejectReasons';
import Validate from 'validate.js';
// import { gql } from 'apollo-boost';
// import { useQuery } from '@apollo/react-hooks';

export default function RejectPost(props) {
    const explaination = useRef(null);
    const suggestedPost = useRef(null);

    const [showSuggestedPost, setShowSuggestedPost] = useState(false);
    const [rejectReason, setRejectReason] = useState(null);

    const [stateObj, setMessage] = useState({
        reasonMessage: null,
        explainationMessage: null,
        suggestedPostMessage: null
    });

    const constraints = {
        reason: {
            presence: { allowEmpty: false }
        },
        explaination: {
            format: {
                pattern: "^$|[a-zA-Z0-9.:);+-?! ]+"
            }
        },
        suggestedPost: {
            format: {
                pattern: "^$|[a-zA-Z0-9.:);+-?! ]+"
            }
        }
    };

    function handleBack() {
        props.handleBack();
    }

    function handleGetReason(reason) {
        setRejectReason(reason);
    }

    function handleShowSuggestedPost() {
        setShowSuggestedPost(!showSuggestedPost);
    }

    function submitRejection() {
        let check = Validate({
            reason: rejectReason,
            explaination: explaination.current.value,
            suggestedPost: suggestedPost.current.value
        }, constraints);

        setMessage(prevState => {
            return {
                ...prevState,
                reasonMessage: check && check.reason ? "Required" : null,
                explainationMessage: check && check.explaination ? "Doesn't look like a valid explaination text.." : null,
                suggestedPostMessage: check && check.suggestedPost ? "Doesn't look like a valid post text.." : null
            }
        });

        if (!check) {
            alert("call reject post");
        }
    }

    return (
        // RP - Reject Post

        // TO-DO: add BE call and also add call that retreives the reasons list
        <div className="main-RP">
            <button className="btn-back" onClick={handleBack}>back</button>
            <div className="body-RP">
                <PendingProblem problemObj={props.post} hideTag={true} />
                <RejectReasons getReason={handleGetReason} helperText={stateObj.reasonMessage}/>
                <div className="div-textarea explaination">
                    <span className="label">Explanation</span>
                    <textarea className="textarea"
                        cols="52"
                        rows="3"
                        placeholder="Add explaination for the post rejection.."
                        ref={explaination}
                        disabled={!rejectReason}></textarea>
                    <span className={stateObj.explainationMessage ? 'show-error' : 'hide-error'}>{stateObj.reportTextMessage}</span>
                </div>
                <div className="div-suggested-post">
                    <label className="pp-checkbox">
                        <input type="checkbox" 
                            checked={showSuggestedPost} 
                            onChange={handleShowSuggestedPost} 
                            disabled={!rejectReason}/>
                        <span>PainPad suggested posted</span>
                    </label>
                    <div className={showSuggestedPost ? 'div-textarea post' : 'none'}>
                        <textarea className="textarea"
                            maxLength="160"
                            cols="52"
                            rows="3"
                            placeholder="How PainPad would have written a post.. "
                            ref={suggestedPost}
                            disabled={!rejectReason}></textarea>
                        <span className={stateObj.suggestedPostMessage ? 'show-error' : 'hide-error'}>{stateObj.reportTextMessage}</span>
                    </div>
                </div>
                <button className="btn-submit" onClick={submitRejection}>Reject post</button>
            </div>
        </div>
    );
}