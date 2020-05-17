import React from 'react';
import './Maps.css';
import Moment from 'react-moment';
import UserShortInfo from './UserShortInfo';
import SameHere from '../SameHere';

export default function AdminPendingProblem(props) {
    function handlePostAction(type, id) {
        props.handlePostAction(type, id);
    }

    return (
        // app - Admin Pending Post
        <div className="div-app">
            <div className="problem-div">
                <div className="div-background"></div>
                <div className="problem-hdr">
                    <UserShortInfo key={props.problemObj.postedBy.id}
                        userInfo={props.problemObj.postedBy} />
                    <ul className="ul-loc-date">
                        <li className="li-loc">{props.problemObj.location}</li>
                        <li className="li-date"><Moment date={props.problemObj.created} format="D MMM" withTitle /></li>
                    </ul>
                </div>
                <p className="problem-body">
                    {props.problemObj.description}
                </p>
                <div className="problem-footer">
                    <SameHere count={0} probelmId={props.problemObj.id} sameHered={props.problemObj.sameHered}/>
                </div>
            </div>
            <div className="div-app-btns">
                <button className="btn-approve" onClick={() => handlePostAction('approve', props.problemObj)}>Approve</button>
                <button className="btn-reject" onClick={() => handlePostAction('reject', props.problemObj)}>Check</button>
            </div>
        </div>
    );
}