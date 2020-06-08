import React, { useState } from 'react';
import './Lists.css';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Typeahead } from 'react-bootstrap-typeahead';

export default function RejectReasons(props) {
    const [allReasons, setAllReasons] = useState([]);

    const GET_REJECTION_REASONS = gql`
            query adminGetRejectReasons {
                adminGetRejectReasons {
                    id, value
                  }
            }
        `;

    useQuery(GET_REJECTION_REASONS, {
        fetchPolicy: 'network-only',
        onCompleted: data => {
            setAllReasons(data.adminGetRejectReasons);
        }
    });

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
                    labelKey="value"
                    options={allReasons}
                    onChange={handleChange}
                    newSelectionPrefix="Add a new reason: "
                    placeholder="Add reason"
                />
                <span className={!props.helperText ? 'none' : 'helper-txt-error'}>{props.helperText}</span>
            </div>)
    );
}