import React from 'react'
import Problem from './reactMaps/problem'

export default function ProblemFeed(props) {
    let listProblems = [];

    if (props.thisPosts.length > 0) {
        listProblems = props.thisPosts.map((problem) =>
            <Problem key={problem.id} problemObj={problem} editPosts={props.editPosts}/>
        );
    }

    return (
        listProblems
    );
}