import React from 'react';
import './Lists.css';
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

    function handleChange(value) {
        props.onChange(value);
    }

    return (
        <div className={props.thisValue ? 'combo-box margin-20' : 'combo-box margin-10'}>
            <span className="location-span">Location</span>
            <Typeahead
                id="locations-list"
                className={!props.helperText ? 'combo-box-lists' : 'combo-box-lists error'}
                labelKey="value"
                defaultSelected={props.thisValue ? [props.thisValue] : []}
                options={(data && data.locations) || (props.thisValue && [props.thisValue]) || []}
                onInputChange={handleInputChange}
                onChange={handleChange}
                disabled={props.thisDisabled}
                placeholder="Locations"
            />
            <span className={!props.helperText ? 'none' : 'helper-txt-error'}>{props.helperText}</span>
        </div>
    );
}