import React, { useState } from 'react';
import './SameHere.css';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import UserSignInUp from '../Modals/SignInUp/SignInUp';

export default function SameHere(props) {
    const [liked, setLiked] = useState(props.liked);
    const [likeCount, setLikeCount] = useState(props.count);
    const [showSignModal, setSignModal] = useState(false);

    const POST_LIKE = gql`
        mutation like($solutionId: ID!, $add: Boolean!){
            like (
                solutionId: $solutionId,
                add: $add
            )
        }
    `;

    const [callPostLike] = useMutation(POST_LIKE, {
        onCompleted: data => {
            if (liked) {
                setLikeCount(likeCount - 1);
            } else {
                setLikeCount(likeCount + 1);
            }

            setLiked(!liked);
        }
    });

    function handleCloseModal() {
        setSignModal(false);
    }

    function handleLike() {
        if (props.isLogin) {
            callPostLike({
                variables: {
                    solutionId: parseInt(props.solutionId),
                    add: !liked
                }
            });
        } else {
            setSignModal(true);
        }
    }

    return (
        <>
            <UserSignInUp withButton={false}
                showModal={showSignModal}
                handleCloseModal={handleCloseModal} />
            <button onClick={handleLike} className={liked ? 'samehered' : 'samehere'}>
                <div className="div-cnt">
                    <span className="sh-cnt">{likeCount}</span>
                    <span className="sh-emoji" role="img" aria-label="Raising hands">👍🏼</span>
                </div>
                <span className="sh-txt">like</span>
            </button>
        </>
    );
};
