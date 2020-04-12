import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function JobTitles(props) {
    //TODO: find source for "Wold Job Title" list
    const jobTitleList = [
        { title: 'President of Sales' },
        { title: 'Dog Trainer' },
        { title: 'Librarian' }
    ];

    function handleChange(event) {
        props.onChange(event.target.value);
    }

    return (
        <>
            <Autocomplete
                id="combo-job-title"
                options={jobTitleList}
                getOptionLabel={(option) => option.title}
                style={{ width: 200 }}
                size="small"
                renderInput={(params) => <TextField {...params} error={props.errorMessage != null} onChange={handleChange} label="Job title" variant="outlined" />}
            />
        </>
    );
}