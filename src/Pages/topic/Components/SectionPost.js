import React, { useState } from 'react'
import '../Topic.css';
import ProblemFeed from '../../../Components/ProblemFeed';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';


export default function SectionPost(props) {
    let data = props.selectedData;

    const [topicPosts, setTopicPosts] = useState([]);

    const GET_TOPIC_POSTS = gql`
        query posts ($topicId: ID!){ 
            posts(topicId: $topicId){
                id, description, 
                postedBy{
                  id, firstName, lastName, profilePic, industry, occupation
                },
                created, industry, 
                location{
                  countryId, countryName, stateId, stateName, cityId, cityName
                },
                subTopic{
                  id, description, topicId, topicName
                },
                approved, sameHere, sameHered
            }
        }
    `;

    useQuery(GET_TOPIC_POSTS, {
        variables:{
            topicId: props.topicId
        },
        onCompleted: data => {
            setTopicPosts(data.posts);
        }
    });

    function handleClearFilter() {
        props.clearFilter();
    }

    return (
        <div className="section-posts">
            <div className={data ? 'div-filter' : 'none'}>
                <div>Filtered for <span>{(data && data.label) || (data && data.selectedData.label)}</span></div>
                <button onClick={handleClearFilter} className="btn-clear"><i className="fas fa-times"></i></button>
            </div>
            <ProblemFeed page={'topic'}
                filter={true} 
                subtopicId={props.subtopicId}
                subtopicName={props.subtopicName}
                countryId={props.countryId}
                topicId={props.topicId}
                topicName={props.topicName}
                thisPosts={topicPosts}/>
        </div>
    );
}