import React, { useState } from 'react';
import './Search.css';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Header from '../../Components/Header/Header';

export default function Search(props) {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const IS_USER_SIGNED_IN = gql`
        query isLogin{
            isLogin {success, id}
        }
    `;

    useQuery(IS_USER_SIGNED_IN, {
        onCompleted: data => {
            setIsSignedIn(data.isLogin.success);
        }
    });

    return (
        <>
            <div className="div-main">
                <div className="col-left">
                    <Header currentPage={props.pageName}
                        isSignedIn={isSignedIn}/>
                </div>
                <div className="col-right main-S">
                    <h3>Search is here..</h3>
                </div>
            </div>
        </>
    );
}