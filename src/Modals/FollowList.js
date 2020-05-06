import React, { useState } from 'react';
import './FollowList.css';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import UserFollow from '../Components/Lists/UserFollow'

export default function FollowList(props) {
    const [showModal, setShow] = useState(false);
    const [showFollower, setShowFollower] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
    const [followingList, setFollowingList] = useState([]);
    const [followerList, setFollowerList] = useState([]);

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

    let [callGetUserStats] = useLazyQuery(GET_USER_STATS, {
        onCompleted: data => {
            setFollowingList(data.userStats.following);
            setFollowerList(data.userStats.followers);
        }
    });

    const handleClose = () => {
        setShow(false);
    }

    const handleShowFollower = () => {
        setShow(true);
        setShowFollower(true);
        setShowFollowing(false);
        callGetUserStats({
            variables: {
                userId: props.userId
            }
        });
    }

    const handleShowFollowing = () => {
        setShow(true);
        setShowFollower(false);
        setShowFollowing(true);
        callGetUserStats({
            variables: {
                userId: props.userId
            }
        });
    }


    return (
        <>
            <ul onClick={handleShowFollower} className="ul-follow">
                <li className="li-num">{props.followerCount}</li>
                <li className="li-text">followers</li>
            </ul>
            <ul onClick={handleShowFollowing} className="ul-follow">
                <li className="li-num">{props.followingCount}</li>
                <li className="li-text">following</li>
            </ul>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <div className="header-btn-div">
                        <button onClick={handleShowFollower} className={(showFollower ? 'selected' : '')}>Followers</button>
                        <span>/</span>
                        <button onClick={handleShowFollowing} className={(showFollowing ? 'selected' : '')}>Following</button>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="FL-body">

                        <UserFollow userList={showFollower ? followerList : followingList}/>

                        {/* {showFollower ? 'Followers' : 'Following'} */}

                    </InputGroup>
                </Modal.Body>
            </Modal>
        </>
    );
}
