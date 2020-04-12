import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function JobTitles(props) {
    //TODO: find source for "Wold Job Title" list
    const cityList = [
        { title: 'Lodndon, ON' },
        { title: 'Calgary, AB' },
        { title: 'New York' }
    ];

    function handleChange(event) {
        props.onChange(event.target.value);
    }

    return (
        <>
            <Autocomplete
                id="combo-city"
                options={cityList}
                getOptionLabel={(option) => option.title}
                style={{ width: 200 }}
                size="small"
                renderInput={(params) => <TextField {...params} error={props.errorMessage != null} onChange={handleChange} label="City" variant="outlined" />}
            />
        </>
    );
}