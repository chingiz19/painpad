import React from 'react';
import './Confirmations.css';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loading from '../../Components/Helpers/Loading'

export default function DeletePost(props) {

    const USER_DELETE_POST = gql`
        mutation removePost($postId: ID!){
            removePost(postId: $postId)
        }
    `;

    const [callDeletePost, { loading, data }] = useMutation(USER_DELETE_POST,{
        onCompleted: data => {
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    });

    function handleDeletePost() {
        callDeletePost({
            variables: {
                postId: parseInt(props.postId)
            }
        });
    };

    return (
        <div className={props.show ? 'div-remove-post' : 'none'}>
            <p>This can’t be undone and the post will be removed from your profile, the timeline of any accounts that follow you.</p>

            {(loading || data)
                ? <Loading done={data} loading={loading} />
                : <button onClick={handleDeletePost}>Delete</button>
            }

        </div>
    );
}