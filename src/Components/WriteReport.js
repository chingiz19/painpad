import React, { useRef, useState } from 'react';
import './WriteReport.css';
import Validate from 'validate.js';
import Locations from './Lists/Locations'
import Indsutries from './Lists/Industries'

export default function WriteReport() {
    const reportText = useRef(null);

    const [industry, setIndustry] = useState(null);
    const [city, setCity] = useState(null)

    const [stateObj, setMessage] = useState({
        industryMessage: null,
        cityMessage: null,
        reportTextMessage: null
    });

    const constraints = {
        industry: {
            presence: { allowEmpty: false }
        },
        city: {
            presence: { allowEmpty: false }
        },
        reportText: {
            format: {
                pattern: "[a-zA-Z0-9.:);+-?! ]+"
            }
        }
    };

    const sendReport = e => {
        let check = Validate({
            industry: industry,
            city: city,
            reportText: reportText.current.value
        }, constraints);

        setMessage(prevState => {
            return {
                ...prevState,
                industryMessage: check && check.industry ? "Required" : null,
                cityMessage: check && check.city ? "Required" : null,
                reportTextMessage: check && check.reportText ? "Ups..Doesn't look like a valid report text" : null
            }
        });

        //This implemented as there is no error attribute for TextArea
        // if (check && check.reportText != null) {
        //     alert("Ups..Doesn't look like a valid report.")
        // }

        //API call to BE goes here

    }

    function handleChangeIndustry(newValue) {
        setIndustry(newValue[0]);
    }

    function handleChangeCity(newValue) {
        setCity(newValue[0]);
    }

    return (
        <>
            <div className="write-report-main">
                <div className="wr-ln-1">
                    <textarea className="wr-textarea" 
                        maxLength="160" 
                        cols="52" 
                        rows="3" 
                        placeholder="What needs a fix?" 
                        ref={reportText}></textarea>
                    <span className={stateObj.reportTextMessage ? 'show-error' : 'hide-error'}>{stateObj.reportTextMessage}</span>
                </div>
                <div className="wr-ln-2">
                    <div className="wr-list-div">
                        <div className="combo-industry">
                            <Indsutries helperText={stateObj.industryMessage}
                                onChange={handleChangeIndustry}
                                thisClassName="autocomplete" 
                                thisPlaceholder="Industry"/>
                        </div>
                        <div className="combo-city">
                            <Locations helperText={stateObj.cityMessage}
                                onChange={handleChangeCity}
                                thisClassName="autocomplete" 
                                thisPlaceholder="Location"/>
                        </div>
                    </div>
                    <button className="btn-report" onClick={sendReport}>Report</button>
                </div>
            </div>
        </>
    );
}