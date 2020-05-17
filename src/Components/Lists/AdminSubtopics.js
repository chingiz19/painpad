import React from 'react';
import './Lists.css';
import { Typeahead } from 'react-bootstrap-typeahead';

export default function AdminSubTopics(props) {
    function handleChange(value) {
        console.log("sub value ", value[0]);
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
                    minLength={2}
                    newSelectionPrefix="Add a new subtopic: "
                    disabled={props.thisDisabled}
                />
                <span className={!props.helperText ? 'none' : 'helper-txt-error'}>{props.helperText}</span>
            </div>)
    );
}