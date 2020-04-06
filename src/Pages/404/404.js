import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (<h2>Page does not exist Go back to <Link to="/">Home</Link></h2>
    );
}