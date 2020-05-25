import React from 'react';
import Problem from './reactMaps/Problem';
import PendingProblem from './reactMaps/PendingProblem';
import AdminPendingProblem from './reactMaps/AdminPendingProblem';
import DynamicIcon from '../Components/Helpers/DynamicIcon';

export default function ProblemFeed(props) {
    let listProblems = [];

    if (props.thisPosts.length > 0) {
        listProblems = props.thisPosts
            .filter(function (problem) {
                return !props.filter 
                    || (!props.subtopicId && !props.countryId) 
                    || (parseInt(problem.subTopic.id) === props.subtopicId) 
                    || (parseInt(problem.location.countryId) === props.countryId);
            })
            .map((problem) =>
                problem && problem.approved
                    ? <Problem key={problem.id}
                        problemObj={problem}
                        editPosts={props.editPosts}
                        isLogin={props.isLogin} />
                    : (
                        props.isAdmin
                            ? <AdminPendingProblem key={problem.id}
                                problemObj={problem}
                                handlePostAction={props.handlePostAction} />
                            : <PendingProblem key={problem.id}
                                problemObj={problem}
                                editPosts={props.editPosts} />
                    )
            );
    }

    return (
        <>
            {listProblems.length > 0
                ? listProblems
                : (
                    <div className="div-no-posts">
                        <DynamicIcon type="noPosts" width="200" height="200" />
                        {
                            props.page === 'topic'
                                ?
                                <>{
                                    props.subtopicId
                                        ?
                                        <p>There are no {props.topicName + ' '} {props.subtopicName ? props.subtopicName : ''} related posts.</p>
                                        :
                                        <p>There are no {props.subtopicName ? props.subtopicName : ''} related posts.</p>
                                }
                                </>
                                :
                                <>
                                    <h3>{props.firstName + " doesn't have posts"}</h3>
                                    <p>{"Follow " + props.firstName + " to see their future posts."}</p>
                                </>
                        }
                    </div>
                )
            }
        </>
    );
}