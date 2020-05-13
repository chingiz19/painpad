import React from 'react';
import Problem from './reactMaps/Problem';
import PendingProblem from './reactMaps/PendingProblem';

export default function ProblemFeed(props) {
    let listProblems = [];

    if (props.thisPosts.length > 0) {
        listProblems = props.thisPosts.map((problem) =>
            problem && problem.approved
            ? <Problem key={problem.id} problemObj={problem} editPosts={props.editPosts}/>
            : <PendingProblem key={problem.id} problemObj={problem} editPosts={props.editPosts}/>
        );
    }

    return (
        listProblems
    );
}