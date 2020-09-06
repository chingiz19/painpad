import React from 'react';
import './Confirmations.css';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loading from '../../Components/Helpers/Loading';
import GoogleAnalytics from '../../Components/Helpers/GoogleAnalytics';

export default function DeleteSolution(props) {

    const USER_DELETE_SOLUTION = gql`
        mutation removeSolution($solutionId: ID!){
            removeSolution(solutionId: $solutionId)
        }
    `;

    const [callDeleteSolution, { loading, data }] = useMutation(USER_DELETE_SOLUTION, {
        onCompleted: data => {
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    });

    function handleDeleteSolution() {
        callDeleteSolution({
            variables: {
                solutionId: parseInt(props.solutionId)
            }
        });

        GoogleAnalytics("Solution Action", "Delete Solution clicked");
    };

    return (
        <div className={props.show ? 'div-remove-post' : 'none'}>
            <p>This can’t be undone and the solution will be removed from your profile, the timeline of any accounts that follow you.</p>

            {(loading || data)
                ? <Loading done={data} loading={loading} />
                : <button onClick={handleDeleteSolution}>Delete</button>
            }

        </div>
    );
}