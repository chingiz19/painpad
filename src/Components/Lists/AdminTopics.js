import React, { useState } from 'react';
import './Lists.css';
import gql from 'graphql-tag';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useQuery } from '@apollo/react-hooks';

export default function AdminTopics(props) {
    const [allTopics, setAllTopics] = useState([]);

    const GET_TPOICS = gql`
            query adminAllTopics {
                adminAllTopics{
                    id, name, subs{
                      id, description, topicId
                    }
                  }
            }
        `;

    useQuery(GET_TPOICS, {
        onCompleted: data => {
            setAllTopics(data.adminAllTopics);
        }
    });

    function handleChange(topic) {
        if (!topic[0]) return;

        // if(topic.length > 0 && topic[0].customOption){
        //     //Add subtopic then update variable
        // } else{
            props.getTopic(topic[0]);
        // }
    }

    return (

        props.thisLoading ? '' :

            (<div className="combo-box topic">
                <span className="label-list">Topics</span>
                <Typeahead
                    id="topics-list"
                    allowNew
                    className={!props.helperText ? 'combo-box-lists' : 'combo-box-lists error'}
                    labelKey="name"
                    options={allTopics}
                    onChange={handleChange}
                    newSelectionPrefix="Add a new topic: "
                />
                <span className={!props.helperText ? 'none' : 'helper-txt-error'}>{props.helperText}</span>
            </div>)
    );
}