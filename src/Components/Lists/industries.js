import React from 'react';
import './Lists.css';
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
                text: event ? event.target.value : '',
                limit: 5
            }
        });
    };

    function handleChange(value) {
        props.onChange(value);
    }

    return (
        <div className="combo-box">
            <span className={!props.thisPlaceholder ? 'industry-span' : 'none'}>Industry</span>
            <Typeahead
                id="industries-list"
                className={!props.helperText ? 'combo-box-lists' : 'combo-box-lists error'}
                labelKey="value"
                defaultSelected={props.thisValue ? [props.thisValue] : []}
                options={(data && data.industries) || (props.thisValue && [props.thisValue]) || []}
                onInputChange={handleInputChange}
                onChange={handleChange}
                disabled={props.thisDisabled}
                emptyLabel="No such industry.."
                placeholder={props.thisPlaceholder}
            />
            <span className={!props.helperText ? 'none' : 'helper-txt-error'}>{props.helperText}</span>
        </div>
    );
}