import React, { useState } from 'react';
import './PostComponents.css';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Problem from '../../../Components/reactMaps/Problem';
import NewSolution from '../../../Modals/NewSolution';
import SolutionFeed from './SolutionFeed';
import SeperatorLine from '../../../Components/SeperatorLine';
import MetaTags from 'react-meta-tags';
import LogoTransperent from '../../../images/logos/logo_transparent.png';

export default function PostSolutions(props) {
    const [solutions, setSolutions] = useState([]);

    const GET_PROBLEM_SOLUTIONS = gql`
        query solutions($postId: ID!){
            solutions(postId: $postId){
                id, logo, name, website, description, likesCnt, liked, created,
                postedBy{
                    id, firstName, lastName, profilePic, industry, occupation
                }
            }
        }
    `;

    useQuery(GET_PROBLEM_SOLUTIONS, {
        variables: {
            postId: props.post ? parseInt(props.post.id) : 1
        },
        onCompleted: data => {
            setSolutions(data.solutions)
        }
    });

    return (
        <>
            <MetaTags>
                <meta name="description" content={props.post && props.post.description} />
                <meta property="og:title" content={props.post && (props.post.postedBy.firstName + ' ' + props.post.postedBy.lastName + "'s Painful Experience")} />
                <meta property="og:image" content={LogoTransperent} />
            </MetaTags>
            <div className="main-PD">
                <Problem problemObj={props.post} editPosts={false} isLogin={props.isSignedIn} origin="Post Page"/>
                <NewSolution post={props.post}/>
                {solutions.length>0 && <SeperatorLine thisValue="Related Solutions" />}
                <SolutionFeed firstName={props.firstName} post={props.post} solutions={solutions} isLogin={props.isSignedIn} origin={props.origin}/>
            </div>
        </>
    );
}