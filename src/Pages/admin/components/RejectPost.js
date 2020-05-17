import React from 'react';
import './AdminComponents.css';
import PendingProblem from '../../../Components/reactMaps/PendingProblem';
// import { gql } from 'apollo-boost';
// import { useQuery } from '@apollo/react-hooks';

export default function RejectPost(props) {
    function handleBack() {
        props.handleBack();
    }

    let reasons = [
        { id: 1, descroption: "Incomplete Expression" },
        {id: 2, descroption: "Age restricted topic"},
        {id: 3, descroption: "Too much capittalisation"},
        {id: 4, descroption: "Bad language"},
        {id: 5, descroption: "Forbidden content"}
    ];

    return (
        // RP - Reject Post
        <div className="main-RP">
            <button className="btn-back" onClick={handleBack}>back</button>
            <div className="body-RP">
                <PendingProblem problemObj={props.post} hideTag={true} />
                <h3>Reject post</h3>
            </div>
        </div>
    );
}