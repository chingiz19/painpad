import React, { useState } from 'react';
import './AdminComponents.css';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useLazyQuery } from '@apollo/react-hooks';
import ProblemFeed from '../../../Components/ProblemFeed';
import ApprovePost from '../components/ApprovePost';
import RejectPost from './RejectPost';

export default function Posts(props) {
    const [allUserPosts, setAllUserPosts] = useState([]);
    const [adminPostAction, setAdminPostAction] = useState(null);
    const [postAction, setPostAction] = useState(null);

    const ADMIN_GET_USER_PENDING_POSTS = gql`
        query adminPendingPosts { 
            adminPendingPosts {
                id, description, 
                postedBy{
                    id, firstName, lastName, profilePic, industry, occupation
                }, 
                created, industry, location
                }
        }
    `;

    useQuery(ADMIN_GET_USER_PENDING_POSTS, {
        onCompleted: data => {
            setAllUserPosts(data.adminPendingPosts);
        }
    });

    const [callGetUserPendingPosts] = useLazyQuery(ADMIN_GET_USER_PENDING_POSTS, {
        fetchPolicy: 'network-only',
        onCompleted: data => {
            setAllUserPosts(data.adminPendingPosts);
        }
    });

    function handlePostAction(type, post) {
        setAdminPostAction(type);
        setPostAction(post);
    }

    function handleBack() {
        setAdminPostAction(null);
        callGetUserPendingPosts({});
    }

    return (
        // apps - Admin Pending Posts
        <div className="main-apps">
            <h2 className="apps-header">
                <span className={adminPostAction ? 'none' : 'count'}>{allUserPosts.length}</span>
                <span>Pending posts</span>
                <div className={adminPostAction ? 'header-type' : 'none'}>
                    <i className="fas fa-long-arrow-alt-right arrow"></i>
                    {adminPostAction === 'approve'
                        ? <div className="approve">Approval</div>
                        : <div className="reject">Reject</div>}
                </div>

            </h2>

            {adminPostAction
            ? (adminPostAction === 'approve'
                ? <ApprovePost handleBack={handleBack} post={postAction}/>
                : <RejectPost handleBack={handleBack} post={postAction}/>)
            : <ProblemFeed thisPosts={allUserPosts} isAdmin={true} handlePostAction={handlePostAction} />}
            
        </div>
    );
}