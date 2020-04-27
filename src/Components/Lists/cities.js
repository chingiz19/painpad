import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';

export default function JobTitles(props) {
    const GET_CITIES = gql`
            query locations($text: String!, $limit: Int!) {
                locations(
                    text: $text, 
                    limit: $limit)
                {id, value}
            }
        `;

    const [callGetCities, { data: dataGetCities }] = useLazyQuery(GET_CITIES);

    function handleChange(event) {
        callGetCities({
            variables: {
                text: event.target.value,
                limit: 5
            }
        });
    };

    return (
        <>
            <Autocomplete
                options={dataGetCities ? dataGetCities.locations : []}
                getOptionLabel={(option) => option.value}
                onChange={(event, option) => {
                    props.onChange(option);
                  }}
                style={{ width: props.thisWidth }}
                size="small"
                renderInput={(params) => <TextField {...params} 
                    error={props.errorMessage != null} 
                    onChange={handleChange} 
                    label="City" 
                    variant={props.thisVariant} />}
            />
        </>
    );
}