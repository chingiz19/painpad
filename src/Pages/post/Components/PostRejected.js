import React from 'react';
import './PostComponents.css';
import DynamicIcon from '../../../Components/Helpers/DynamicIcon';
import RejectedProblem from '../../../Components/reactMaps/RejectedProblem';

export default function PostRejected(props) {
    return (
        <>
            {
                props.problemObj
                    ? (
                        <>
                            <div className="div-explation">
                                <DynamicIcon type="noFollow" width="150" height="150" />
                                <h2>Ooh no....</h2>
                                <h4>{
                                    props.problemObj.explanation
                                        ?
                                        props.problemObj.explanation
                                        :
                                        <>
                                            Your problem was rejected due to <span>{props.problemObj.reason}</span>.
                                        </>
                                }
                                </h4>
                            </div>
                            <RejectedProblem problemObj={props.problemObj} />
                            <div className={props.problemObj.suggestion ? 'suggested' : 'none'}>
                                <h4>This is how we would have written it:</h4>
                                <p>"{props.problemObj.suggestion}"</p>
                            </div>
                            <div className={props.problemObj.explanation ? 'div-sub-explation' : 'none'}>
                                Further explaination: {props.problemObj.explanation}
                            </div>
                        </>
                    )
                    : (
                        null
                    )
            }
        </>
    );
}