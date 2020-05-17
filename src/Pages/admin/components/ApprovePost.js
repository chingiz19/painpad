import React, { useState } from 'react';
import './AdminComponents.css';
import PendingProblem from '../../../Components/reactMaps/PendingProblem';
import AdminTopics from '../../../Components/Lists/AdminTopics';
import AdminSubtopics from '../../../Components/Lists/AdminSubtopics';
import Validate from 'validate.js';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import Loading from '../../../Components/Helpers/Loading';

export default function ApprovePost(props) {
    const [topic, setTopic] = useState(null);
    const [subtopic, setSubtopic] = useState(null);
    const [allSubtopics, setAllSubtopics] = useState([]);

    const [stateObj, setMessage] = useState({
        topicMessage: null,
        subtopicMessage: null
    });

    const constraints = {
        topic: {
            presence: { allowEmpty: false }
        },
        subtopic: {
            presence: { allowEmpty: false }
        }
    };

    const ADMIN_APPROVE_POST = gql`
        mutation adminApprovePost ($postId: ID!, $subTopicId: ID!){
            adminApprovePost(
                postId: $postId,
                subTopicId: $subTopicId
            )
        }
    `;

    const [callApprovePost, { loading: loadingApprove, error: errorApprove, data: adataApprove }] = useMutation(ADMIN_APPROVE_POST, {
        onCompleted: data => {
            setTimeout(() => {
                handleBack();
            }, 2000);
        }
    });

    function handleBack() {
        props.handleBack();
    }

    function getTopic(topic) {
        setTopic(topic);
        setAllSubtopics(topic.subs);
    }

    function getSubtopic(subtopic) {
        setSubtopic(subtopic);
    }

    function submitApproval() {
        let check = Validate({
            topic: topic,
            subtopic: subtopic
        }, constraints);

        setMessage(prevState => {
            return {
                ...prevState,
                topicMessage: check && check.topic ? "Required" : null,
                subtopicMessage: check && check.subtopic ? "Required" : null
            }
        });

        // if (!check) {
        //     callApprovePost({
        //         variables: {
        //             postId: parseInt(props.post.id),
        //             subTopicId: parseInt(subtopic.id)
        //         }
        //     });
        // }

    }

    return (
        // AP - Approve Post
        <div className="main-AP">
            <button className="btn-back" onClick={handleBack}>back</button>
            <div className="body-AP">
                <PendingProblem problemObj={props.post} hideTag={true}/>
                <AdminTopics getTopic={getTopic} 
                    helperText={stateObj.topicMessage}/>
                <AdminSubtopics list={allSubtopics} 
                    getSubtopic={getSubtopic} 
                    thisDisabled={!topic} 
                    helperText={stateObj.subtopicMessage}/>

                {(loadingApprove || adataApprove)
                    ? <Loading done={adataApprove} loading={loadingApprove} />
                    : <button className="btn-submit" onClick={submitApproval}>Approve post</button>}

                {errorApprove && <Loading error={errorApprove} />}

            </div>
        </div>
    );
}