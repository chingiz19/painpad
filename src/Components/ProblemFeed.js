import React from 'react'
import Problem from './reactMaps/problem'

export default function ProblemFeed(props) {
    let listProblems = [];

    if (props.thisPosts.userFeed.length > 0) {
        listProblems = props.thisPosts.userFeed.map((problem) =>
            <Problem key={problem.id} problemObj={problem} />
        );
    }

    return (
        listProblems
    );
}