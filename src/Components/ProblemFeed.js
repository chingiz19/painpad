import React from 'react'
import Problem from './reactMaps/problem'

export default function ProblemFeed(props) {

    const listProblems = props.thisPosts.map((problem) =>
        <Problem key={problem.problem.id} problemObj={problem}/>
    );

    return (
        listProblems
    );
}