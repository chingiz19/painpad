import React, { useRef, useState } from 'react';
import './WriteReport.css';
import Validate from 'validate.js';
import Locations from './Lists/Locations'
import Indsutries from './Lists/Industries'

export default function WriteReport() {
    const reportText = useRef(null);
    let industry = null;
    let city = null;

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
                pattern: "[a-zA-Z]+"
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
                reportTextMessage: check && check.reportText ? "Ups..Doesn't look like a valid report." : null
            }
        });

        //This implemented as there is no error attribute for TextArea
        if (check && check.reportText != null) {
            alert("Ups..Doesn't look like a valid report.")
        }

        //API call to BE goes here

    }

    function handleChangeIndustry(newValue) {
        industry = newValue;
    }

    function handleChangeCity(newValue) {
        city = newValue;
    }

    return (
        <>
            <div className="write-report-main">
                <textarea className="wr-textarea" maxLength="160" cols="52" rows="3" placeholder="What needs a fix?" ref={reportText}></textarea>
                <div className="wr-ln-2">
                    <div className="wr-list-div">
                        <div className="combo-industry">
                            <Indsutries thisVariant="outlined"
                                thisWidth={200}
                                errorMessage={stateObj.industryMessage} 
                                onChange={handleChangeIndustry} />
                        </div>
                        <div className="combo-city">
                            <Locations thisVariant="outlined" 
                                thisWidth={200}
                                errorMessage={stateObj.cityMessage} 
                                onChange={handleChangeCity} />
                        </div>
                    </div>
                    <button className="btn-send-report" onClick={sendReport}>Report</button>
                </div>
            </div>
        </>
    );
}