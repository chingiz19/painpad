import React from 'react';
import './Lists.css';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import { Typeahead } from 'react-bootstrap-typeahead';

export default function Occupations(props) {

    const GET_OCCUPATIONS = gql`
            query occupations($text: String!, $limit: Int!) {
                occupations(
                    text: $text, 
                    limit: $limit)
                {occupationId: id, occupation: value}
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

    function handleChange(value) {
        props.onChange(value);
    }

    return (

        props.thisLoading ? '' :

            (<div className="combo-box">
                <span className="occupation-span">Occupation</span>
                <Typeahead
                    id="occupations-list"
                    labelKey="occupation"
                    emptyLabel="No such occupation.."
                    className={!props.helperText ? 'combo-box-lists' : 'combo-box-lists error'}
                    defaultSelected={props.thisValue ? [props.thisValue] : []}
                    options={(data && data.occupations) || (props.thisValue && [props.thisValue]) || []}
                    onFocus={handleInputChange}
                    onInputChange={handleInputChange}
                    onChange={handleChange}
                    placeholder={props.thisPlaceholder}
                    disabled={props.thisDisabled}
                />
                <span className={!props.helperText ? 'none' : 'helper-txt-error'}>{props.helperText}</span>
            </div>)
    );
}