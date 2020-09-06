import React, { useState } from 'react';
import '../Profile.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProblemFeed from '../../../Components/ProblemFeed';
import DynamicIcon from '../../../Components/Helpers/DynamicIcon';

export default function PostSection(props) {
    let userInfo = props.userInfo;
    let isLogin = props.isLogin;
    let allUserPosts = props.allUserPosts;
    let hasMore = props.hasMore;

    const [editPosts, setEditPosts] = useState(false);

    const handleEditPosts = () => {
        setEditPosts(!editPosts);
    }

    function handleLoadMore() {
        props.handleLoadMore();
    }

    return (
        <>
            <button className={allUserPosts && allUserPosts.length && userInfo && userInfo.self ? 'btn-user-prof posts-edit-btn' : 'none'}
                onClick={handleEditPosts}>{editPosts ? 'Cancel' : 'Edit'}</button>
            <InfiniteScroll
                scrollableTarget="mp-problem"
                scrollThreshold={1}
                dataLength={allUserPosts.length}
                next={handleLoadMore}
                hasMore={hasMore}
                loader={
                    (allUserPosts.length > 4 && <DynamicIcon type='loading' width={80} height={80} />)
                }
                endMessage={
                    (allUserPosts.length > 0 && <div className="end-message">Yay! You've seen it all.</div>)
                }>
                <ProblemFeed filter={false}
                    thisPosts={allUserPosts || []}
                    editPosts={editPosts}
                    firstName={userInfo && userInfo.user.firstName}
                    isLogin={isLogin}
                    showEmpty={true}
                    origin="Profile" />
            </InfiniteScroll>
        </>
    );
}