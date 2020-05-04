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
                {locationId: id, location: value}
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

        props.thisLoading ? '' :

            (<div className="combo-box">
                <span className={!props.thisPlaceholder ? 'location-span' : 'none'}>Location</span>
                <Typeahead
                    id="locations-list"
                    className={!props.helperText ? 'combo-box-lists' : 'combo-box-lists error'}
                    labelKey="location"
                    defaultSelected={props.thisValue ? [props.thisValue] : []}
                    options={(data && data.locations) || (props.thisValue && [props.thisValue]) || []}
                    onInputChange={handleInputChange}
                    onChange={handleChange}
                    disabled={props.thisDisabled}
                    placeholder={props.thisPlaceholder}
                />
                <span className={!props.helperText ? 'none' : 'helper-txt-error'}>{props.helperText}</span>
            </div>)
    );
}