import React from 'react';
import './UserStats.css'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export default function UserStats(props) {

    const GET_USER_STATS = gql`
        query userStats($userId: ID!){
            userStats(userId:$userId){
            following{
                id, firstName, lastName, profilePic, industry, occupation
            }
            followers{
                id, firstName, lastName, profilePic, industry, occupation
            }
            }
        }
    `;

    const { data: dataGetUserStats } = useQuery(GET_USER_STATS, {
        variables: {
            userId: props.userId
        },
    });

    let userStats = dataGetUserStats ? dataGetUserStats.userStats : null;

    return (
        <div className="user-stats-div">
            <ul>
                <li className="li-num">{props.userScore ? props.userScore : 0}</li>
                <li className="li-text">points</li>
            </ul>
            <ul>
                <li className="li-num">{userStats ? userStats.followers.length : 0}</li>
                <li className="li-text">followers</li>
            </ul>
            <ul>
                <li className="li-num">{userStats ? userStats.following.length : 0}</li>
                <li className="li-text">following</li>
            </ul>
        </div>
    );
}