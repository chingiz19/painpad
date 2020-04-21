import React from 'react';
import './Industries.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function Industries(props) {
    //TODO: find source for "Wold Job Title" list
    // List of industries. https://www.ibisworld.com/canada/list-of-industries/
    const industryList = [
        { title: 'Coal Mining' },
        { title: 'Candy & Chocolate Manufacturing' },
        { title: 'Internet Service Providers' },
        { title: 'Investment Management' }
    ];

    let selectedIndustry = 0;

    for (let i = 0; i < industryList.length; i++) {
        if (industryList[i].title === props.thisValue) {
            selectedIndustry = i;
        }
    };

    function handleChange(event) {
        props.onChange(event.target.value);
    }

    return (
        <>
            <Autocomplete
                className={(props.thisValue ? props.thisClassName : 'none')}
                value={industryList[selectedIndustry]}
                disabled={props.thisDisabled}
                options={industryList}
                getOptionLabel={(option) => option.title}
                style={{ width: props.thisWidth }}
                size="small"
                renderInput={(params) => <TextField {...params} error={props.errorMessage != null} onChange={handleChange} label="Industry" variant={props.thisVariant} />}
            />
            <Autocomplete
                className={(!props.thisValue ? props.thisClassName : 'none')}
                disabled={props.thisDisabled}
                options={industryList}
                getOptionLabel={(option) => option.title}
                style={{ width: props.thisWidth }}
                size="small"
                renderInput={(params) => <TextField {...params} error={props.errorMessage != null} onChange={handleChange} label="Industry" variant={props.thisVariant} />}
            />
        </>
    );
}