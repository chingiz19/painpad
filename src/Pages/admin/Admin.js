import React, { useState } from 'react';
import './Admin.css';
import HeaderAdmin from './components/HeaderAdmin';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Posts from './components/Posts';
import Analytics from './components/Analytics';

export default function Admin(props) {
    const [selectedComp, setSelectedComp] = useState('post');

    const IS_USER_ADMIN = gql`
        query isAdmin{
            isAdmin 
        }
    `;

    const { data: isUserAdmin } = useQuery(IS_USER_ADMIN, {
        onError: ({ graphQLErrors }) => {
            window.location.href = "/404";
        }
    });

    function handleSelectComp(type) {
        setSelectedComp(type);
    }

    return (
        <>
            <div className={isUserAdmin && isUserAdmin.isAdmin ? "div-main" : "none"}>
                <div className="col-left">
                    <HeaderAdmin currentPage={props.pageName}
                        selectComp={handleSelectComp} />
                </div>
                <div className="col-right">
                    <div className={selectedComp === 'post' ? '' : 'none'}>
                        <Posts />
                    </div>
                    <div className={selectedComp === 'analytics' ? '' : 'none'}>
                        <Analytics />
                    </div>
                </div>
            </div>
        </>
    );
}