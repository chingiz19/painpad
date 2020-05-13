import React from 'react';
import Problem from './reactMaps/Problem';
import PendingProblem from './reactMaps/PendingProblem';
import DynamicIcon from '../Components/Helpers/DynamicIcon';

export default function ProblemFeed(props) {
    let listProblems = [];

    if (props.thisPosts.length > 0) {
        listProblems = props.thisPosts.map((problem) =>
            problem && problem.approved
                ? <Problem key={problem.id} problemObj={problem} editPosts={props.editPosts} />
                : <PendingProblem key={problem.id} problemObj={problem} editPosts={props.editPosts} />
        );
    }

    return (
        <>
            {listProblems.length > 0
                ? listProblems
                : (
                    <div className="div-no-posts">
                        <DynamicIcon type="noPosts" width="200" height="200" />
                        <h3>{props.firstName + " doesn't have posts"}</h3>
                        <p>{"Follow " + props.firstName + " to see their posts."}</p>
                    </div>
                )
            }
        </>
    );
}