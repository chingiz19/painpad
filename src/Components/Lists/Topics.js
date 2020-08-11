import React, { useState } from 'react';
import './Lists.css';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function Topics(props) {
    const [topicList, setTopicList] = useState([]);
    const [value, setValue] = useState();

    const GET_TOPIC_LIST = gql`
        query topicList{
            topicList{
                value, label
            }
        }
    `;

    useQuery(GET_TOPIC_LIST, {
        onCompleted: data => {
            setTopicList(data.topicList);
        }
    });


    function handleChange(value) {
        props.onChange(value);
        setValue(value);
    }

    return (

        <div className="combo-box">
            <Dropdown placeholderClassName="dd-box"
                options={topicList}
                onChange={handleChange}
                value={value}
                placeholder="Related to" />
            <span className={!props.helperText ? 'none' : 'helper-txt-error'}>{props.helperText}</span>
        </div>
    );
}