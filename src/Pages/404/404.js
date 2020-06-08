import React from 'react';
import './404.css';
import DynamicIcon from '../../Components/Helpers/DynamicIcon';
import HeaderWeb from '../../Components/HeaderWeb';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';


export default function NotFound(props) {
    const IS_USER_SIGNED_IN = gql`
        query isLogin{
            isLogin {success, id}
        }
    `;

    const { data: isSignedIn } = useQuery(IS_USER_SIGNED_IN);

    return (
        <>
            <div className="div-main">
                <div className="col-left">
                    <HeaderWeb currentPage={props.pageName}
                        isSignedIn={isSignedIn} />
                </div>
                <div className="col-right">
                    <div className="main main-404">
                        <DynamicIcon type="notFound" width="400" height="280" />
                        <h2>Page Not Found</h2>
                        <p>Sorry, this page could not be found. You may want to check <a href="/">home page</a>.</p>
                    </div>
                </div>
            </div>
        </>
    );
}