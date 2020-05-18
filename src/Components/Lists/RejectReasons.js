import React from 'react';
import './Lists.css';
// import gql from 'graphql-tag';
// import { useQuery } from '@apollo/react-hooks';
import { Typeahead } from 'react-bootstrap-typeahead';

export default function RejectReasons(props) {
    // const [allTopics, setAllTopics] = useState([]);

    // const GET_TPOICS = gql`
    //         query adminAllTopics {
    //             adminAllTopics{
    //                 id, name, subs{
    //                   id, description, topicId
    //                 }
    //               }
    //         }
    //     `;

    // useQuery(GET_TPOICS, {
    //     onCompleted: data => {
    //         setAllTopics(data.adminAllTopics);
    //     }
    // });

    let allReasons = [
        { id: 1, name: "Incomplete Expression" },
        {id: 2, name: "Age restricted topic"},
        {id: 3, name: "Too much capittalisation"},
        {id: 4, name: "Bad language"},
        {id: 5, name: "Forbidden content"}
    ];

    function handleChange(reason) {
        if (!reason[0]) return;
        props.getReason(reason[0]);
    }

    return (

        props.thisLoading ? '' :

            (<div className="combo-box">
                <span className="label-list">Reasons</span>
                <Typeahead
                    id="topics-list"
                    allowNew
                    className={!props.helperText ? 'combo-box-lists' : 'combo-box-lists error'}
                    labelKey="name"
                    options={allReasons}
                    onChange={handleChange}
                    newSelectionPrefix="Add a new reason: "
                    placeholder="Add reason"
                />
                <span className={!props.helperText ? 'none' : 'helper-txt-error'}>{props.helperText}</span>
            </div>)
    );
}