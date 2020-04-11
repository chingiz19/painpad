import React, { useRef, useState } from 'react';
import './SignUp.css';
import Validate from 'validate.js';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SignUp() {
    const firstName = useRef(null);
    const lastName = useRef(null);
    const username = useRef(null);
    const jobTitle = useRef(null);
    const industry = useRef(null);
    const password = useRef(null);

    //worldJobTitleList and worldIndustryList should be supplied by BE
    //TODO: find source for "Wold Job Title" list
    const jobTitleList = [
        { title: 'President of Sales' },
        { title: 'Dog Trainer' },
        { title: 'Librarian' }
    ];

    // List of industries. https://www.ibisworld.com/canada/list-of-industries/
    const worldIndustryList = [
        { title: 'Newspaper Publishing' },
        { title: 'Moving Services' },
        { title: 'Construction Machinery' }
    ];

    const [stateObj, setMessage] = useState({
        firstNameMessage: null,
        lastNameMessage: null,
        usernameMessage: null,
        jobTitleMessage: null,
        industryMessage: null,
        passMessage: null
    });

    const constraints = {
        firstName: {
            format: {
                pattern: "[a-zA-Z]+"
            }
        },
        lastName: {
            format: {
                pattern: "[a-zA-Z]+"
            }
        },
        jobTitle: {
            format: {
                pattern: "[a-zA-Z]+"
            }
        },
        industry: {
            presence: { allowEmpty: false }
        },
        username: {
            email: {
                message: "Please enter valid email"
            }
        },
        password: {
            length: {
                minimum: 6
            }
        }
    };

    const submitInput = e => {
        let check = Validate({
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            jobTitle: jobTitle.current.value,
            industry: industry.current.value,
            username: username.current.value,
            password: password.current.value
        }, constraints);

        setMessage(prevState => {
            return {
                ...prevState,
                firstNameMessage: check && check.firstName ? "Can only contain letters" : null,
                lastNameMessage: check && check.lastName ? "Can only contain letters" : null,
                usernameMessage: check && check.username ? "Please enter valid email" : null,
                jobTitleMessage: check && check.jobTitle ? "Can only contain letters" : null,
                industryMessage: check && check.industry ? "Required" : null,
                passMessage: check && check.password ? "Minimum 6 characters or more" : null
            }
        });

        //API call to BE goes here

    }

    return (
        <>
            <div className="signup-main">

                <TextField required
                    error={stateObj.firstNameMessage != null}
                    id="signup-first-name"
                    label="First name"
                    name="first-name"
                    inputRef={firstName}
                    helperText={stateObj.firstNameMessage}
                    variant="outlined"
                    size="small"
                    type="text" />

                <TextField required
                    error={stateObj.lastNameMessage != null}
                    id="signup-last-name"
                    label="Last name"
                    name="last-name"
                    inputRef={lastName}
                    helperText={stateObj.lastNameMessage}
                    variant="outlined"
                    size="small"
                    type="text" />

                <TextField required
                    error={stateObj.usernameMessage != null}
                    id="signup-email"
                    label="Email"
                    name="email"
                    inputRef={username}
                    helperText={stateObj.usernameMessage}
                    variant="outlined"
                    size="small"
                    type="email" />

                <Autocomplete
                    id="combo-job-title"
                    options={jobTitleList}
                    getOptionLabel={(option) => option.title}
                    style={{ width: 200 }}
                    size="small"
                    renderInput={(params) => <TextField {...params} error={stateObj.jobTitleMessage != null} inputRef={jobTitle} label="Job title" variant="outlined" />}
                />

                <Autocomplete
                    id="combo-industry"
                    options={worldIndustryList}
                    getOptionLabel={(option) => option.title}
                    style={{ width: 200 }}
                    size="small"
                    renderInput={(params) => <TextField {...params} error={stateObj.industryMessage != null} inputRef={industry} label="Industry" variant="outlined" />}
                />

                <TextField required
                    error={stateObj.passMessage != null}
                    id="signin-password"
                    label="Password"
                    name="password"
                    inputRef={password}
                    helperText={stateObj.passMessage}
                    variant="outlined"
                    size="small"
                    type="password" />

                <button onClick={submitInput}>Submit</button>
            </div>
        </>
    );
}