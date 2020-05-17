import React, { useState } from 'react';
import './AdminComponents.css';
import PendingProblem from '../../../Components/reactMaps/PendingProblem';
import AdminTopics from '../../../Components/Lists/AdminTopics';
import AdminSubtopics from '../../../Components/Lists/AdminSubtopics';
// import { gql } from 'apollo-boost';
// import { useQuery } from '@apollo/react-hooks';

export default function ApprovePost(props) {
    const [topic, setTopic] = useState(null);
    const [subtopic, setSubtopic] = useState(null);
    const [allSubtopics, setAllSubtopics] = useState([]);

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

    return (
        // AP - Approve Post
        <div className="main-AP">
            <button className="btn-back" onClick={handleBack}>back</button>

            <div className="body-AP">
                <PendingProblem problemObj={props.post} hideTag={true}/>
                <AdminTopics getTopic={getTopic}/>
                <AdminSubtopics list={allSubtopics} getSubtopic={getSubtopic} thisDisabled={!topic}/>
                <button className="btn-submit">Approve post</button>
            </div>
                

        </div>
    );
}