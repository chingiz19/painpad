import React from 'react'
import './problem.css'

import UserProfPic from '../../images/users/profile-pictures/elnarsharifli.jpg'

export default function Problems(props) {

    return (
        <div key={props.problemObj.problem.id} className="problem-div">
            <div className="problem-hdr">
                <img src={UserProfPic} className="user-prof-pic" alt="User Profile" />
                <ul>
                    <li className="user-name-li">{props.problemObj.poster.firstName + " " + props.problemObj.poster.lastName}</li>
                    <li className="user-industry-li">{props.problemObj.poster.industry}</li>
                </ul>
            </div>
            <p className="problem-body">
                {props.problemObj.problem.body}
            </p>
            <div className="problem-footer">
                <button className="samehere">
                    <span className="sh-cnt">{props.problemObj.problem.same_here_count}</span>
                    <span className="sh-emoji" role="img" aria-label="Raising hands">🙌🏼</span>
                    <span className="sh-txt">Same-Here</span>
                </button>
                <div className="problem-what">{props.problemObj.problem.problem_what} related</div>
            </div>
        </div>
    );
}