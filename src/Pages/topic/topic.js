import React from 'react';

export default function Topic(props) {
    const { topic } = props.match.params

    return (
        <h2>{topic} is so interesting</h2>
    );
}