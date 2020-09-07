import React from 'react';
import './Maps.css';
import Moment from 'react-moment';
import UserShortInfo from './UserShortInfo';
import SameHere from '../SameHere';
import ConfirmationModal from '../../Modals/ConfirmationModal';
import GoogleAnalytics from '../Helpers/GoogleAnalytics';

export default function Problem(props) {
    let problemObj = props.problemObj;
    let solutionCnt = problemObj && problemObj.solutionCnt;

    function analytics(value) {
        if (value === 'viewAnalytics') {
            let objGA = {
                category: `${props.origin}, Problem Action`,
                action: 'View Analytics clicked',
                label: problemObj.subTopic.topicName
            };
            GoogleAnalytics('', objGA);
        } else if (value === 'viewSolution') {
            let objGA = {
                category: `${props.origin}, Problem Action`,
                action: 'View Colutions clicked',
                label: problemObj.subTopic.topicName
            };
            GoogleAnalytics('', objGA);
        }
    }

    return (
        <>
            {
                problemObj
                    ? (
                        <div className="problem-div">
                            <ConfirmationModal showButton={true}
                                editPosts={props.editPosts}
                                postId={parseInt(problemObj.id)}
                                header="Delete post"
                                type="deletePost" />
                            <div className="problem-hdr">
                                <UserShortInfo key={problemObj.postedBy.id}
                                    userInfo={problemObj.postedBy}
                                    origin={props.origin + ", Problem"} />
                                <ul className="ul-loc-date">
                                    <li className="li-loc">{problemObj.location.cityName + ', ' + problemObj.location.countryName}</li>
                                    <li className="li-date"><Moment date={problemObj.created} format="D MMM" withTitle /></li>
                                </ul>
                            </div>
                            <p className="problem-body">
                                {problemObj.description}
                            </p>
                            <div className="problem-footer">
                                <SameHere count={problemObj.sameHere}
                                    probelmId={problemObj.id}
                                    sameHered={problemObj.sameHered}
                                    isLogin={props.isLogin}
                                    origin={props.origin} />

                                <a className="problem-topic"
                                    href={'/topics/' + problemObj.subTopic.topicId}
                                    onClick={() => analytics('viewAnalytics')}>
                                    <i className="fas fa-chart-pie"></i> Analytics</a>
                            </div>

                            <a href={'/posts/' + problemObj.id}
                                className={props.origin === 'Post Page' ? 'none' : 'btn-solution'}
                                onClick={() => analytics('viewSolution')}>{solutionCnt === 0 ? 'Add Solution' : (solutionCnt > 1) ? 'View Solutions (' + solutionCnt + ')' : 'View Solution'}</a>

                        </div>
                    )
                    : (
                        null
                    )
            }
        </>
    );
}