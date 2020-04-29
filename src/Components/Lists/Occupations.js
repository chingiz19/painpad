import React from 'react';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import { Typeahead } from 'react-bootstrap-typeahead';

export default function Occupations(props) {

    const GET_OCCUPATIONS = gql`
            query occupations($text: String!, $limit: Int!) {
                occupations(
                    text: $text, 
                    limit: $limit)
                {id, value}
            }
        `;

    let [callGetOccupations, { data }] = useLazyQuery(GET_OCCUPATIONS);

    function handleInputChange(value, event) {
        callGetOccupations({
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
                id="occupations-list"
                labelKey="value"
                defaultSelected={props.thisValue ? [props.thisValue] : []}
                options={(data && data.occupations) || [props.thisValue]}
                onInputChange={handleInputChange}
                onChange={handleChange}
                disabled={props.thisDisabled}
                placeholder="Occupations"
            />
        </>
    );
}