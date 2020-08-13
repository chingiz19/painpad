import React from 'react'
import '../Topic.css';
import ProblemFeed from '../../../Components/ProblemFeed';
import InfiniteScroll from 'react-infinite-scroll-component';
import DynamicIcon from '../../../Components/Helpers/DynamicIcon';
import GoogleAnalytics from '../../../Components/Helpers/GoogleAnalytics';


export default function SectionPost(props) {
    let data = props.selectedData;
    let posts = props.posts;  

    function handleClearFilter() {
        props.clearFilter();

        let objGA={
            category: "Topic Page Action",
            action: "Clear Filter clicked"
        };
        GoogleAnalytics('', objGA);
    }

    function handleLoadMore() {
        props.getMorePosts();
    };

    return (
        <div className="section-posts">
            <div className={data ? 'div-filter' : 'none'}>
                <div>Filtered for <span>{(data && data.label) || (data && data.selectedData.label)}</span></div>
                <button onClick={handleClearFilter} className="btn-clear"><i className="fas fa-times"></i></button>
            </div>
            <InfiniteScroll
                scrollableTarget="main-TP"
                scrollThreshold={1}
                dataLength={posts.length}
                next={handleLoadMore}
                hasMore={props.hasMore}
                key={Math.random()}
                loader={
                    (posts.length > 2 && <DynamicIcon type='loading' width={80} height={80} />)
                }
                endMessage={
                    <div className="end-message">Yay! You've seen it all.</div>
                }>
                <ProblemFeed isLogin={props.isSignedIn}
                    filter={true}
                    countryId={props.countryId}
                    thisPosts={posts} 
                    origin="Topic Page"/>
            </InfiniteScroll>
        </div>
    );
}