import React, { useRef } from 'react'
import Problem from './reactMaps/problem'

export default function ProblemFeed() {

    let problem_tmp = useRef([{
        poster: {
            firstName: "Elnar",
            lastName: "Sharifli",
            profilePic: "../images/users/profile-pictures/elnarsharifli.jpg",
            industry: "Investment Management"
        },
        problem: {
            id: "123423",
            body: "Phone charger cable not being able to reach your bed. You may rearrange bed, or lie on floor, so you can scroll through Facebook or some other website.",
            same_here_count: 8,
            problem_what: "parking"
        }
    },
    {
        poster: {
            firstName: "Elnar",
            lastName: "Sharifli",
            profilePic: "../images/users/profile-pictures/elnarsharifli.jpg",
            industry: "Investment Management"
        },
        problem: {
            id: "225",
            body: "Having to give your friends your WiFi code. Made even worse when one of your friends isn't listening or arrives late, and you have to give it out again.",
            same_here_count: 23,
            problem_what: "wi-fi"
        }
    }
    ]);

    const problems = problem_tmp.current;

    const listProblems = problems.map((problem) =>
        <Problem key={problem.problem.id} problemObj={problem}/>
    );

    return (
        listProblems
    );
}