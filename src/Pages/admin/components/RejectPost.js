import React from 'react';
import './AdminComponents.css';
import PendingProblem from '../../../Components/reactMaps/PendingProblem';
// import { gql } from 'apollo-boost';
// import { useQuery } from '@apollo/react-hooks';

export default function RejectPost(props) {

    function handleBack() {
        props.handleBack();
    }

    return (
        // RP - Reject Post
        <div className="main-RP">
            <button className="btn-back" onClick={handleBack}>back</button>

            <div>
                <PendingProblem problemObj={props.post} hideTag={true}/>
            </div>
                

        </div>
    );
}