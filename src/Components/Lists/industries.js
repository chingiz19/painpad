import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function JobTitles(props) {
    //TODO: find source for "Wold Job Title" list
    // List of industries. https://www.ibisworld.com/canada/list-of-industries/
    const industryList = [
        { title: 'Coal Mining' },
        { title: 'Candy & Chocolate Manufacturing' },
        { title: 'Internet Service Providers' }
    ];

    function handleChange(event) {
        props.onChange(event.target.value);
    }

    return (
        <>
            <Autocomplete
                id="combo-industry"
                options={industryList}
                getOptionLabel={(option) => option.title}
                style={{ width: 200 }}
                size="small"
                renderInput={(params) => <TextField {...params} error={props.errorMessage != null} onChange={handleChange} label="Industry" variant="outlined" />}
            />
        </>
    );
}