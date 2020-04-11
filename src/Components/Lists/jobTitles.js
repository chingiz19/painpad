import React, { useState } from 'react';
import './jobTitles.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function JobTitles(props) {
    const jobTitleList = [
        { title: 'President of Sales' },
        { title: 'Dog Trainer' },
        { title: 'Librarian' }
    ];

    return (
        <>
            <Autocomplete
                    id="combo-job-title"
                    options={jobTitleList}
                    getOptionLabel={(option) => option.title}
                    style={{ width: 300 }}
                    size="small"
                    renderInput={(params) => <TextField {...params} error={props.jobTitleMessage != null} inputRef={jobTitle} label="Job title" variant="outlined" />}
                />
        </>
    );
}