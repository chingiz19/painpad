import React from 'react';
import './Lists.css';
import { Typeahead } from 'react-bootstrap-typeahead';

export default function AdminSubTopics(props) {
    
    function handleChange(subtopic) {
        if (!subtopic[0]) return;
        props.getSubtopic(subtopic[0]);
    }

    return (

        props.thisLoading ? '' :

            (<div className="combo-box topic">
                <span className="label-list">Subtopics</span>
                <Typeahead
                    id="topics-list"
                    allowNew
                    className={!props.helperText ? 'combo-box-lists' : 'combo-box-lists error'}
                    labelKey="description"
                    options={props.list}
                    onChange={handleChange}
                    newSelectionPrefix="Add a new subtopic: "
                    disabled={props.thisDisabled}
                />
                <span className={!props.helperText ? 'none' : 'helper-txt-error'}>{props.helperText}</span>
            </div>)
    );
}