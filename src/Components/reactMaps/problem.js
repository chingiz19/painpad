import React from 'react';
import './Maps.css';
import Moment from 'react-moment';
import UserShortInfo from './UserShortInfo';
import SameHere from '../SameHere';
import ConfirmationModal from '../../Modals/ConfirmationModal';

export default function Problem(props) {
    return (
        <>
            {
                props.problemObj
                    ? (
                        <div className="problem-div">
                            <ConfirmationModal showButton={true}
                                editPosts={props.editPosts}
                                postId={parseInt(props.problemObj.id)}
                                header="Delete post"
                                type="deletePost" />
                            <div className="problem-hdr">
                                <UserShortInfo key={props.problemObj.postedBy.id}
                                    userInfo={props.problemObj.postedBy} />
                                <ul className="ul-loc-date">
                                    <li className="li-loc">{props.problemObj.location.cityName + ', ' + props.problemObj.location.countryName}</li>
                                    <li className="li-date"><Moment date={props.problemObj.created} format="D MMM" withTitle /></li>
                                </ul>
                            </div>
                            <p className="problem-body">
                                {props.problemObj.description}
                            </p>
                            <div className="problem-footer">
                                <SameHere count={props.problemObj.sameHere}
                                    probelmId={props.problemObj.id}
                                    sameHered={props.problemObj.sameHered}
                                    isLogin={props.isLogin} />
                                <a className="problem-topic"
                                    href={'/topics/' + props.problemObj.subTopic.topicId}>
                                    related to <span>{props.problemObj.subTopic.topicName}</span></a>
                            </div>
                        </div>
                    )
                    : (
                        null
                    )
            }
        </>
    );
}