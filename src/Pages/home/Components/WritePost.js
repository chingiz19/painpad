import React from 'react';
import './HomeComponents.css';
import PostExplaination from './PostExplaination';
import Post from './Post';


export default function WritePost(props) {
    return (
        // WP - Write Post
        <div className="sec-wp">
            <PostExplaination/>
            <Post isLogin={props.isLogin}
                userId={props.userId}/>
        </div>
    );
}