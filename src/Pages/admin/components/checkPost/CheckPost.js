import React, { useState } from 'react';
import '../AdminComponents.css';
import PendingProblem from '../../../../Components/reactMaps/PendingProblem';
import Reject from './Reject';
import Edit from './Edit';
// import { gql } from 'apollo-boost';
// import { useQuery } from '@apollo/react-hooks';

export default function RejectPost(props) {
    const [rejectionType, setRejectionType] = useState('reject');

    function handleBack() {
        props.handleBack();
    }

    function handleTypeChange(type) {
        setRejectionType(type);
    }

    return (
        // RP - Reject Post
        <div className="main-RP">
            <button className="btn-back" onClick={handleBack}>back</button>
            <div className="body-RP">
                <PendingProblem problemObj={props.post} hideTag={true} />
                <div className="type">
                    <button className={rejectionType === 'reject' ? 'selected br-left' : 'btn-type'}
                        onClick={() => handleTypeChange('reject')}>Reject</button>
                    <button className={rejectionType === 'edit' ? 'selected br-right' : 'btn-type'}
                        onClick={() => handleTypeChange('edit')}>Edit</button>
                </div>
                {rejectionType === 'reject'
                    ? <Reject/>
                    : <Edit/>}
            </div>
        </div>
    );
}