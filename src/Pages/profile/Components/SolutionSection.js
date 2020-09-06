import React, { useState } from 'react';
import '../Profile.css';
import SolutionFeed from '../../post/Components/SolutionFeed';

export default function SolutionSection(props) {
    let userInfo = props.userInfo;
    let isLogin = props.isLogin;
    let solutions = props.solutions;

    const [editSols, setEditSols] = useState(false);

    const handleEditPosts = () => {
        setEditSols(!editSols);
    }

    return (
        <>
            <button className={solutions && solutions.length && userInfo && userInfo.self ? 'btn-user-prof posts-edit-btn' : 'none'}
                onClick={handleEditPosts}>{editSols ? 'Cancel' : 'Edit'}</button>
            <SolutionFeed firstName={userInfo && userInfo.user.firstName} 
                post={true} 
                solutions={solutions} 
                isLogin={isLogin}
                user={true}
                editSol={editSols}/>
        </>
    );
}