import React from 'react'
import './Lists.css';
import UserShortInfo from '../reactMaps/UserShortInfo'

export default function UserFollowList(props) {

    const listUsers = props.userList.map((user) =>
        <UserShortInfo key={user.id}
            userInfo={user}/>
    );

    return (
        listUsers
    );
}