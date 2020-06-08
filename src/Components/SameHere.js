import React, { useState } from 'react';
import './SameHere.css';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import UserSignInUp from '../Modals/SignInUp/SignInUp';

export default function SameHere(props) {
    const [sameHered, setSameHered] = useState(props.sameHered);
    const [sameHereCount, setSameHereCount] = useState(props.count);
    const [showSignModal, setSignModal] = useState(false);

    const POST_SAME_HERE = gql`
        mutation sameHere($postId: ID!, $add: Boolean!){
            sameHere (
                postId: $postId,
                add: $add
            )
        }
    `;

    const [callPostSameHere] = useMutation(POST_SAME_HERE, {
        onCompleted: data => {
            if(sameHered){
                setSameHereCount(sameHereCount - 1);
            } else{
                setSameHereCount(sameHereCount + 1);
            }
            setSameHered(!sameHered);
        }
    });

    function handleCloseModal() {
        setSignModal(false);
    }

    function handleSameHere() {
        if(props.isLogin){
            callPostSameHere({
                variables: {
                    postId: parseInt(props.probelmId),
                    add: !sameHered
                }
            });
        } else{
            setSignModal(true);
        }
    }

    return (
        <>
            <UserSignInUp withButton={false}
                    showModal={showSignModal}
                    handleCloseModal={handleCloseModal} />
            <button className={sameHered ? 'samehered' : 'samehere'} onClick={handleSameHere}>
                <div className="div-cnt">
                    <span className="sh-cnt">{sameHereCount}</span>
                    <span className="sh-emoji" role="img" aria-label="Raising hands">🙌🏼</span>
                </div>
                <span className="sh-txt">same-here</span>
            </button>
        </>
    );
};
