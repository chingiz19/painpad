import React from 'react';
import './Maps.css';
import Moment from 'react-moment';
import SolutionLike from '../../Components/SolutionLike';
import ConfirmationModal from '../../Modals/ConfirmationModal';

export default function Solution(props) {
    let solution = props.solution || null;

    return (
        <>
            {
                solution
                    ? (
                        <div className="solution-div">
                            <ConfirmationModal showButton={true}
                                editPosts={props.editSol}
                                solutionId={parseInt(solution.id)}
                                header="Delete solution"
                                type="deleteSolution" />
                            <div className="header">
                                <div className="sol-details">
                                    <img alt="logo" src={solution && solution.logo} />
                                   <div className="col-name">
                                        {
                                            solution && solution.website
                                                ? (
                                                    <a className="a-name" href={solution && solution.website}>
                                                        <p className="p-name">{solution.name}</p>
                                                        <i className="fas fa-link"></i>
                                                    </a>
                                                )
                                                : <div className="div-name">
                                                    <p className="p-name">{solution.name}</p>
                                                    <a href={solution && solution.website} className="website">{solution && solution.website}</a>
                                                </div>
                                        }
                                        <a href={'/users/' + (solution && solution.postedBy.id)} className="posted-by">posted by <span>{solution && (solution.postedBy.firstName + ' ' + solution.postedBy.lastName)}</span></a>
                                    </div>
                                </div>
                                <div className="sol-charac">
                                    <Moment date={solution.created} format="D MMM" withTitle />
                                </div>
                            </div>
                            <p className="body">
                                {solution && solution.description}
                            </p>
                            <SolutionLike isLogin={props.isLogin} 
                                solutionId={solution && solution.id} 
                                count={solution && solution.likesCnt} 
                                liked={solution && solution.liked}
                                origin={props.origin}/>
                        </div>
                    )
                    : (
                        null
                    )
            }
        </>
    );
}