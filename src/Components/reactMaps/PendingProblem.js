import React from 'react';
import './Maps.css';
import Moment from 'react-moment';
import UserShortInfo from './UserShortInfo';
import SameHere from '../SameHere';
import ConfirmationModal from '../../Modals/ConfirmationModal'

export default function PendingProblem(props) {
    return (
        <div className="problem-div">
            <div className="div-background"></div>
            <ConfirmationModal showButton={true} 
                editPosts={props.editPosts} 
                postId={parseInt(props.problemObj.id)} 
                header="Delete post" 
                type="deletePost"/>
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
                <div className={props.hideTag ? 'none' : 'div-pending'}>Reject</div>
            </div>
        </div>
    );
}