import React, { useState } from 'react';
import './UserStats.css'
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import FollowList from '../Modals/FollowList'

export default function UserStats(props) {
    let pageUserId = parseInt(window.location.href.split("users/")[1]);
    let myUserId = parseInt(props.isUserSignedIn && props.isUserSignedIn.isLogin.id);

    const [iFollow, setIFollow] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

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

    const POST_USER_FOLLOW = gql`
        mutation follow($userIdToFollow: ID!){
            follow(userIdToFollow: $userIdToFollow)
        }
    `;

    const POST_USER_UNFOLLOW = gql`
        mutation unFollow($userIdToUnFollow: ID!){
            unFollow(userIdToUnFollow: $userIdToUnFollow)
        }
    `;

    useQuery(GET_USER_STATS, {
        variables: {
            userId: props.userId
        },
        onCompleted: data => {
            for (let i = 0; i < data.userStats.followers.length; i++) {
                let tmpUser = data.userStats.followers[i];
                if (parseInt(tmpUser.id) === myUserId) {
                    setIFollow(true);
                }
            }
            setFollowerCount(data.userStats.followers.length);
            setFollowingCount(data.userStats.following.length);
        }
    });

    const [callPostUserFollow] = useMutation(POST_USER_FOLLOW, {
        onCompleted: data => {
            setIFollow(true);
            setFollowerCount(followerCount + 1);
        }
    });

    const [callPostUserUnfollow] = useMutation(POST_USER_UNFOLLOW, {
        onCompleted: data => {
            setIFollow(false);
            setFollowerCount(followerCount - 1);
        }
    });

    function handleFollow() {
        if (iFollow) {
            callPostUserUnfollow({
                variables: {
                    userIdToUnFollow: pageUserId
                }
            });
        } else {
            callPostUserFollow({
                variables: {
                    userIdToFollow: pageUserId
                }
            });
        }
    }

    return (
        <>
            <div className="user-stats-div">
                <ul>
                    <li className="li-num">{props.userScore}</li>
                    <li className="li-text">points</li>
                </ul>
                <FollowList followerCount={followerCount} followingCount={followingCount} userId={props.userId}/>
                {/* <ul>
                    <li className="li-num">{followerCount}</li>
                    <li className="li-text">followers</li>
                </ul>
                <ul>
                    <li className="li-num">{followingCount}</li>
                    <li className="li-text">following</li>
                </ul> */}

            </div>

            <button className={(!props.isMyProfile ? 'btn-follow' : 'none')} onClick={handleFollow}>{iFollow ? "Unfollow" : "Follow"}</button>
        </>
    );
}