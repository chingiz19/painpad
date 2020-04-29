import React from 'react';
import './Industries.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import gql from 'graphql-tag';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';

export default function Industries(props) {

    const GET_INDUSTRIES = gql`
            query industries($text: String!, $limit: Int!) {
                industries(
                    text: $text, 
                    limit: $limit)
                {id, value}
            }
        `;

    const [callGetIndustries, { data: Industries_1 }] = useLazyQuery(GET_INDUSTRIES);

    const { data: Industries_0 } = useQuery(GET_INDUSTRIES, {
        variables: {
            text: props.thisValue ? props.thisValue.value : '',
            limit: 5
        }
    });

    function handleChange(event, value) {
        callGetIndustries({
            variables: {
                text: event ? event.target.value : value,
                limit: 5
            }
        });
    };

    return (
        <>
            <Autocomplete
                value={props.thisValue.value}
                options={Industries_1 ? Industries_1.industries : (Industries_0 ? Industries_0.industries : [])}
                getOptionLabel={(option) => option.value}
                getOptionSelected={(option, value) => {
                    return option.title === value.value;
                 }}
                onChange={(event, option) => {
                    props.onChange(option);
                }}
                style={{ width: props.thisWidth }}
                size="small"
                disabled={props.thisDisabled}
                renderInput={(params) => <TextField {...params}
                    error={props.errorMessage != null}
                    onChange={handleChange}
                    label="Industry"
                    variant={props.thisVariant} />}
            />
        </>
    );
}