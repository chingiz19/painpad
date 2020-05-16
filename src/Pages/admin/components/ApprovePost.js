import React from 'react';
import './AdminComponents.css';
import PendingProblem from '../../../Components/reactMaps/PendingProblem';
// import { gql } from 'apollo-boost';
// import { useQuery } from '@apollo/react-hooks';

export default function ApprovePost(props) {

    function handleBack() {
        props.handleBack();
    }

    return (
        // AP - Approve Post
        <div className="main-AP">
            <button className="btn-back" onClick={handleBack}>back</button>

            <div>
                <PendingProblem problemObj={props.post} hideTag={true}/>
            </div>
                

        </div>
    );
}