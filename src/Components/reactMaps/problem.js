import React from 'react';
import './Maps.css';
import Moment from 'react-moment';
import UserShortInfo from './UserShortInfo';
import SameHere from '../SameHere';

export default function Problems(props) {

    return (
        <div className="problem-div">
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
                <SameHere count={props.problemObj.sameHere} probelmId={props.problemObj.id}/>
                <a className="problem-what"
                    href={'/topics/' + props.problemObj.topic.name}>
                    {props.problemObj.topic.name} related</a>
            </div>
        </div>
    );
}