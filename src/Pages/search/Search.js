import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import Validate from 'validate.js';
import Fade from 'react-reveal/Fade';
import './Search.css';
import Header from '../../Components/Header/Header';
import DynamicIcon from '../../Components/Helpers/DynamicIcon';
import UserList from '../../Components/Lists/UserFollowList';
import ProblemFeed from '../../Components/ProblemFeed';

export default function Search(props) {
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState({});
    const [searchMessage, setSearchMessage] = useState(null);
    const [searchEmpty, setSearchEmpty] = useState(false);
    const [showClear, setShowClear] = useState(false);

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const IS_USER_SIGNED_IN = gql`
        query isLogin{
            isLogin {success, id}
        }
    `;

    const GET_USER_INFO = gql`
        query userProfile($userId: ID!) {
            userProfile(userId: $userId) {
                self, user{
                    id, firstName, lastName, profilePic
                }
            }
        }
    `;

    let postQuery = `
        id, description,
        postedBy{
            id, firstName, lastName, profilePic, industry, occupation
        },
        created, industry, 
        location{
            countryId, countryName, stateId, stateName, cityId, cityName
        },
        subTopic{
            id, description, topicId, topicName
        },
        approved, sameHere, sameHered
    `;

    const GET_SEARCH_RESULTS = gql`
        query search($text: String!) {
            search(text: $text) {
                users{
                    id, firstName, lastName, profilePic, industry, occupation
                },
                topicPosts{
                    ${postQuery}
                },
                locationPosts{
                    ${postQuery}
                }
            }
        }
    `;

    const constraints = {
        search: {
            format: {
                pattern: "[a-zA-Z0-9.:());+-?!# ]+"
            }
        }
    };

    useQuery(IS_USER_SIGNED_IN, {
        onCompleted: data => {
            setUserId(data.isLogin.id);
            setIsSignedIn(data.isLogin.success);
            getUserInfo();
        }
    });

    const [getUserInfo] = useLazyQuery(GET_USER_INFO, {
        variables: {
            userId: parseInt(userId)
        },
        onCompleted: data => {
            setUserInfo(data && data.userProfile.user);
        }
    });

    const [getSearchResult] = useLazyQuery(GET_SEARCH_RESULTS, {
        fetchPolicy: 'network-only',
        onCompleted: data => {
            search && setSearchResult(data.search);
            setSearchEmpty(!data.search.users.length && !data.search.topicPosts.length && !data.search.locationPosts.length);
        }
    });

    function hadnleInputChange(value) {
        setSearch(value);
        setShowClear(value && true);

        if (!value) {
            handleInputClear();
            return;
        }

        if(value.length < 2) return;

        let check = Validate({
            search: value
        }, constraints);

        setSearchMessage(check && check.search ? "Ups..Doesn't look like a valid search" : null);

        if (!check) {
            getSearchResult({
                variables: {
                    text: value.toLowerCase()
                }
            });
        }
    }

    function handleInputClear() {
        setSearch('');
        setShowClear(false);
        setSearchMessage(null);
        setSearchResult({});
        setSearchEmpty(false);
    }

    return (
        <>
            <div className="div-main">
                <div className="col-left">
                    <Header currentPage={props.pageName}
                        isSignedIn={isSignedIn}
                        userId={userId}
                        userInfo={userInfo} />
                </div>
                <div className="col-right main-search">
                    <div className="main-header">Search</div>
                    <div className="body-search">
                        <DynamicIcon type="search" width="250" height="150" />
                        <Fade>
                            <span className="sub-header">Search PainPad</span>
                            <div className="div-search">
                                <div className={(!searchMessage ? 'user-input search' : 'user-input search error')}>
                                    <i className="fas fa-search"></i>
                                    <input id="input-search"
                                        name="search"
                                        value={search}
                                        onChange={e => hadnleInputChange(e.target.value)}
                                        type="text" />
                                    <button className={showClear ? 'clear' : 'none'} onClick={handleInputClear}>
                                        <i className="fas fa-times"></i>
                                    </button>
                                    <span className="helper-txt">{searchMessage}</span>
                                </div>
                            </div>
                        </Fade>
                        {
                            !searchEmpty
                                ? (
                                    <div className="result-search">
                                        <div className={searchResult && searchResult.users && searchResult.users.length ? 'users' : 'none'}>
                                            <h3>Found users for <span className="searched">'{search}'</span></h3>
                                            <UserList userList={(searchResult && searchResult.users) || []} />
                                        </div>
                                        <div className={searchResult && searchResult.topicPosts && searchResult.topicPosts.length ? 'topic' : 'none'}>
                                            <h3>Found posts are related to <span className="searched">'{search}'</span></h3>
                                            <ProblemFeed thisPosts={(searchResult && searchResult.topicPosts) || []}
                                                isLogin={isSignedIn}
                                                showEmpty={false} />
                                        </div>
                                        <div className={searchResult && searchResult.locationPosts && searchResult.locationPosts.length ? 'location' : 'none'}>
                                            <h3>Found posts are related to location <span className="searched">'{search}'</span> (i.e. city or country)</h3>
                                            <ProblemFeed thisPosts={(searchResult && searchResult.locationPosts) || []}
                                                isLogin={isSignedIn}
                                                showEmpty={false} />
                                        </div>
                                    </div>
                                )
                                : <span className="sub-header">Nothing found for '{search}'</span>
                        }

                    </div>
                </div>
            </div>
        </>
    );
}