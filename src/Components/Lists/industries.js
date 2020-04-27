import React from 'react';
import './Industries.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';

export default function Industries(props) {
    const GET_INDUSTRIES = gql`
            query industries($text: String!, $limit: Int!) {
                industries(
                    text: $text, 
                    limit: $limit)
                {id, value}
            }
        `;
    
    const [callGetIndustries, { data: dataIndustries }] = useLazyQuery(GET_INDUSTRIES);

    function handleChange(event) {
        callGetIndustries({
            variables: {
                text: event.target.value,
                limit: 5
            }
        });
    };


    // let selectedIndustry = 0;

    // for (let i = 0; i < industryList.length; i++) {
    //     if (industryList[i].title === props.thisValue) {
    //         selectedIndustry = i;
    //     }
    // };

    return (
        <>
            {/* <Autocomplete
                className={(props.thisValue ? props.thisClassName : 'none')}
                value={industryList[selectedIndustry]}
                disabled={props.thisDisabled}
                options={data ? data.industries : []}
                getOptionLabel={(option) => option.value}
                style={{ width: props.thisWidth }}
                size="small"
                renderInput={(params) => <TextField {...params} error={props.errorMessage != null} onChange={handleChange} label="Industry" variant={props.thisVariant} />}
            /> */}
            <Autocomplete
                options={dataIndustries ? dataIndustries.industries : []}
                getOptionLabel={(option) => option.value}
                onChange={(event, option) => {
                    props.onChange(option);
                  }}
                className={(!props.thisValue ? props.thisClassName : 'none')}
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