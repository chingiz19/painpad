import React from 'react';
import './Industries.css';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import { Typeahead } from 'react-bootstrap-typeahead';

export default function Industries(props) {

    const GET_INDUSTRIES = gql`
            query industries($text: String!, $limit: Int!) {
                industries(
                    text: $text, 
                    limit: $limit)
                {id, value}
            }
        `;

    let [callGetIndustries, { data }] = useLazyQuery(GET_INDUSTRIES);

    function handleInputChange(value, event) {
        callGetIndustries({
            variables: {
                text: event.target.value,
                limit: 5
            }
        });
    };

    function handleChange(value){
        props.onChange(value);
    }

    return (
        <>
            <Typeahead
                id="industries-list"
                labelKey="value"
                defaultSelected={props.thisValue ? [props.thisValue] : []}
                options={(data && data.industries) || [props.thisValue]}
                onInputChange={handleInputChange}
                onChange={handleChange}
                disabled={props.thisDisabled}
                placeholder="Industries"
            />
        </>
    );
}