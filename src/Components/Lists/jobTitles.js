import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function JobTitles(props) {
    //TODO: find source for "Wold Job Title" list
    const jobTitleList = [
        { title: 'President of Sales' },
        { title: 'Dog Trainer' },
        { title: 'Librarian' },
        { title: 'Reporting Analyst' }
    ];

    let selectedJobTitle = 0;

    for (let i = 0; i < jobTitleList.length; i++) {
        if (jobTitleList[i].title === props.thisValue){
            selectedJobTitle = i;
        }
    };

    function handleChange(event) {
        props.onChange(event.target.value);
    }

    return (
        <>
            <Autocomplete
                className={(props.thisValue ? props.thisClassName : 'none')}
                value={jobTitleList[selectedJobTitle]}
                disabled={props.thisDisabled}
                options={jobTitleList}
                getOptionLabel={(option) => option.title}
                style={{ width: props.thisWidth }}
                size="small"
                renderInput={(params) => <TextField {...params} error={props.errorMessage != null} onChange={handleChange} label="Job title" variant={props.thisVariant} />}
            />
            <Autocomplete
                className={(!props.thisValue ? props.thisClassName : 'none')}
                disabled={props.thisDisabled}
                options={jobTitleList}
                getOptionLabel={(option) => option.title}
                style={{ width: props.thisWidth }}
                size="small"
                renderInput={(params) => <TextField {...params} error={props.errorMessage != null} onChange={handleChange} label="Job title" variant={props.thisVariant} />}
            />
        </>
    );
}