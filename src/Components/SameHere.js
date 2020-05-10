import React, { useState } from 'react';
import './SameHere.css';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

export default function SameHere(props) {
    const [sameHered, setSameHered] = useState(false);
    const [sameHereCount, setSameHereCount] = useState(0);

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
                setSameHereCount(props.count + 1);
            }
            setSameHered(!sameHered);
        }
    });

    function handleSameHere() {
        callPostSameHere({
            variables: {
                postId: parseInt(props.probelmId),
                add: !sameHered
            }
        });
    }

    return (
        <button className={sameHered ? "samehered" : "samehere"} onClick={handleSameHere}>
            <span className="sh-cnt">{sameHereCount ? sameHereCount : props.count}</span>
            <span className="sh-emoji" role="img" aria-label="Raising hands">🙌🏼</span>
            <span className="sh-txt">Same-Here</span>
        </button>
    );
};
