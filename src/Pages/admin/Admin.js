import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import './Admin.css';
import HeaderAdmin from './components/HeaderAdmin';
import Posts from './components/Posts';
import Analytics from './components/Analytics';

export default function Admin(props) {
    const [selectedComp, setSelectedComp] = useState('post');
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminAnalytics, setAdminAnalytics] = useState({});

    const IS_USER_ADMIN = gql`
        query isAdmin{
            isAdmin 
        }
    `;

    const GET_ADMIN_ANALYTICS = gql`
        query adminAnalytics{
            adminAnalytics{
                usersCnt, postsCnt, sameHereCnt, pendingPostsCnt
            }
        }
    `;

    useQuery(IS_USER_ADMIN, {
        onCompleted: data => {
            if(!data.isAdmin) window.location.href = "/404";
            setIsAdmin(data.isAdmin);
            getAdminAnalytics({});
        },
        onError: ({ graphQLErrors }) => {
            window.location.href = "/404";
        }
    });

    const [getAdminAnalytics] = useLazyQuery(GET_ADMIN_ANALYTICS, {
        onCompleted: data => {
            setAdminAnalytics(data.adminAnalytics);
        }
    });

    function handleSelectComp(type) {
        setSelectedComp(type);
    }

    return (
        <>
            <div className={isAdmin ? 'div-main' : 'none'}>
                <div className="col-left">
                    <HeaderAdmin currentPage={props.pageName}
                        selectComp={handleSelectComp} />
                </div>
                <div className="col-right">
                    <div className={selectedComp === 'post' ? '' : 'none'}>
                        <Posts />
                    </div>
                    <div className={selectedComp === 'analytics' ? '' : 'none'}>
                        <Analytics data={adminAnalytics}/>
                    </div>
                </div>
            </div>
        </>
    );
}