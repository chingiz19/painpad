import React, { useState } from 'react';
import './UserStats.css';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import UserSignInUp from '../../../Modals/SignInUp/SignInUp';
import UserFollow from '../../../Modals/UserFollow';

export default function UserStats(props) {
    let pageUserId = parseInt(props.pageUserId);
    let myUserId = parseInt(props.myUserId);

    const [iFollow, setIFollow] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [showSignModal, setSignModal] = useState(false);

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
            userId: pageUserId
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
        if(!props.isSignedIn){
            handleShowModal();
            return;
        }

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
    };

    function handleCloseModal() {
        setSignModal(false);
    }

    function handleShowModal() {
        setSignModal(true);
    }

    return (
        <>
            <div className="user-stats-div">
                <ul>
                    <li className="li-num">{props.userScore}</li>
                    <li className="li-text">points</li>
                </ul>
                <UserFollow followerCount={followerCount}
                    followingCount={followingCount}
                    userId={props.pageUserId}
                    isSignedIn={props.isSignedIn}
                    handleShowModal={handleShowModal}/>
            </div>

            <UserSignInUp withButton={false}
                showModal={showSignModal}
                handleCloseModal={handleCloseModal} />

            <button className={(!props.isMyProfile ? 'btn-follow' : 'none')} 
                onClick={handleFollow}>{iFollow ? "Unfollow" : "Follow"}</button>
        </>
    );
}