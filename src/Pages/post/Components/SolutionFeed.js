import React from 'react';
import './PostComponents.css';
import DynamicIcon from '../../../Components/Helpers/DynamicIcon';
import Solution from '../../../Components/reactMaps/Solution';

export default function SolutionFeed(props) {
    let listSolutions = [];
    let solutionCnt = props.solutions.length;

    if (solutionCnt > 0) {
        listSolutions = props.solutions
            .map((solution) =>
                <Solution key={solution.id} solution={solution} isLogin={props.isLogin}/>
            );
    }


    return (
        // SF - Solution Feed
        <>
            <div style={{ padding: (solutionCnt > 0) && '20px 0' }} className="SF-body">
                {
                    solutionCnt > 0
                        ? listSolutions
                        :
                        (props.post &&
                            (<div className="noSolution">
                                <DynamicIcon type="noSolution" width={250} height={200} />
                                {props.firstName && <p>{props.firstName} has not received a solution to their problem. Be the first to help!</p>}
                            </div>))
                }
            </div>
        </>
    );
}