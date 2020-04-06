import React from 'react';

export default function Profile(props) {
    const { userId } = props.match.params

    return (<h2>Profile for {userId} broooo!</h2>);
}