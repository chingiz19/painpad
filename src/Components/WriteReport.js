import React, { useRef, useState } from 'react';
import './WriteReport.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Validate from 'validate.js';

export default function WriteReport() {
    const reportTxt = useRef(null);
    const industry = useRef(null);
    const city = useRef(null);

    // List of industries. https://www.ibisworld.com/canada/list-of-industries/
    const [stateObj, setMessage] = useState({
        jobTitleMessage: null
    });

    const constraints = {
        industry: {
            presence: { allowEmpty: false }
        },
        city: {
            presence: { allowEmpty: false }
        }
    };

    const sendReport = e => {
        let check = Validate({
            industry: industry.current.value
        }, constraints);

        setMessage(prevState => {
            return {
                ...prevState,
                industryMessage: check && check.industry ? "Required" : null,
                cityMessage: check && check.city ? "Required" : null
            }
        });

        //API call to BE goes here

    }

    const industryList = [
        { title: 'Newspaper Publishing' },
        { title: 'Moving Services' },
        { title: 'Construction Machinery' }
    ];

    const cityList = [
        { title: 'Lodndon, ON' },
        { title: 'Calgary, AB' },
        { title: 'New York' }
    ];

    return (
        <>
            <div className="write-report-main">
                {/* inputRef={reportTxt} */}
                <textarea className="wr-textarea" maxLength="160" cols="52" rows="3" placeholder="What needs a fix?"></textarea>
                <div className="wr-ln-2">
                    <div className="wr-list-div">
                        <div className="combo-industry">
                            <Autocomplete
                                id="combo-industry"
                                options={industryList}
                                getOptionLabel={(option) => option.title}
                                style={{ width: 200 }}
                                size="small"
                                renderInput={(params) => <TextField {...params} error={stateObj.jobTitleMessage != null} inputRef={industry} label="Industry" variant="outlined" />}
                            />
                        </div>
                        <div className="combo-cities">
                            <Autocomplete
                                id="combo-cities"
                                options={cityList}
                                getOptionLabel={(option) => option.title}
                                style={{ width: 200 }}
                                size="small"
                                renderInput={(params) => <TextField {...params} error={stateObj.citiesMessage != null} inputRef={city} label="Industry" variant="outlined" />}
                            />
                        </div>
                    </div>
                    <button className="btn-send-report" onClick={sendReport}>Report</button>
                </div>
            </div>
        </>
    );
}