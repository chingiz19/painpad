import React from 'react';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import { Typeahead } from 'react-bootstrap-typeahead';

export default function Locations(props) {

    const GET_LOCATIONS = gql`
            query locations($text: String!, $limit: Int!) {
                locations(
                    text: $text, 
                    limit: $limit)
                {id, value}
            }
        `;

    let [callGetLocations, { data }] = useLazyQuery(GET_LOCATIONS);

    function handleInputChange(value, event) {
        callGetLocations({
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
                id="locations-list"
                labelKey="value"
                defaultSelected={props.thisValue ? [props.thisValue] : []}
                options={(data && data.locations) || [props.thisValue]}
                onInputChange={handleInputChange}
                onChange={handleChange}
                disabled={props.thisDisabled}
                placeholder="Locations"
            />
        </>
    );
}