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

    const ADMIN_ADD_SUBTOPIC = gql`
        mutation adminAddSubTopic ($name: String!, $topicId: ID!){
            adminAddSubTopic (
                topicId: $topicId,
                name: $name
            )
        }
    `;

    const ADMIN_ADD_TOPIC = gql`
        mutation adminAddTopic ($name: String!){
            adminAddTopic(
                name: $name
            )
        }
    `;

    const ADMIN_APPROVE_POST = gql`
        mutation adminApprovePost ($postId: ID!, $subTopicId: ID!){
            adminApprovePost(
                postId: $postId,
                subTopicId: $subTopicId
            )
        }
    `;

    const [callAddSubtopic] = useMutation(ADMIN_ADD_SUBTOPIC, {
        onCompleted: data => {
            handleCallApprovePost(parseInt(data.adminAddSubTopic));
        }
    });

    const [callAddTopic] = useMutation(ADMIN_ADD_TOPIC, {
        onCompleted: data => {
            callAddSubtopic({
                variables: {
                    name: subtopic.description,
                    topicId: parseInt(data.adminAddTopic)
                }
            });
        }
    });

    const [callApprovePost, { loading: loadingApprove, error: errorApprove, data: dataApprove }] = useMutation(ADMIN_APPROVE_POST, {
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
        setAllSubtopics((topic && topic.subs && topic.subs[0].id) ? topic.subs : []);
    }

    function getSubtopic(subtopic) {
        setSubtopic(subtopic);
    }

    function handleCallApprovePost(subtopicId) {
        callApprovePost({
            variables: {
                postId: parseInt(props.post.id),
                subTopicId: parseInt(subtopicId || subtopic.id)
            }
        });
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

        if (!check) {
            if (topic.customOption) {
                callAddTopic({
                    variables: {
                        name: topic.name
                    }
                });
            } else if (subtopic.customOption) {
                callAddSubtopic({
                    variables: {
                        name: subtopic.description,
                        topicId: parseInt(topic.id)
                    }
                });
            } else {
                handleCallApprovePost();
            }
        }
    }

    return (
        // AP - Approve Post
        <div className="main-AP">
            <button className="btn-back" onClick={handleBack}>back</button>
            <div className="body-AP">
                <PendingProblem problemObj={props.post} hideTag={true} />
                <AdminTopics getTopic={getTopic}
                    helperText={stateObj.topicMessage} 
                    selected={props.post.topic}/>
                <AdminSubtopics list={allSubtopics}
                    getSubtopic={getSubtopic}
                    thisDisabled={!topic}
                    helperText={stateObj.subtopicMessage} />

                {(loadingApprove || dataApprove)
                    ? <Loading done={dataApprove} loading={loadingApprove} />
                    : <button className="btn-submit" onClick={submitApproval}>Approve post</button>}

                {errorApprove && <Loading error={errorApprove} />}

            </div>
        </div>
    );
}