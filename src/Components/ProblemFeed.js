import React from 'react'
import './ProblemFeed.css'

import UserProfPic from '../images/users/profile-pictures/elnarsharifli.jpg'

export default function ProblemFeed(){

    let problem_tmp={
        poster:{
            firstName: "Elnar",
            lastName: "Sharifli",
            profilePic: "../images/users/profile-pictures/elnarsharifli.jpg",
            industry: "Investment Management"
        },
        problem:{
            body: "Phone charger cable not being able to reach your bed. You may rearrange bed, or lie on floor, so you can scroll through Facebook or some other website.",
            same_here_count: 8,
            problem_what: "parking"
        }
    };

    return (
        <div className="problem-div">
            <div className="problem-hdr">
                <img src={UserProfPic} className="user-prof-pic" alt="User Profile" />
                <ul>
                    <li className="user-name-li">{problem_tmp.poster.firstName + " " + problem_tmp.poster.lastName}</li>
                    <li className="user-industry-li">{problem_tmp.poster.industry}</li>
                </ul>
            </div>
            <p className="problem-body">
                {problem_tmp.problem.body}
            </p>
            <div className="problem-footer">
                <button className="samehere">
                    <span className="sh-cnt">{problem_tmp.problem.same_here_count}</span>
                    <span className="sh-emoji" role="img" aria-label="Raising hands">🙌🏼</span>
                    <span className="sh-txt">Same-Here</span>
                </button>
                <div className="problem-what">{problem_tmp.problem.problem_what}</div>
            </div>
        </div>
    );
}