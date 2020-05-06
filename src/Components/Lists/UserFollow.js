import React from 'react'
import './Lists.css';
import UserShortInfo from '../reactMaps/UserShortInfo'

export default function UserFollow(props) {

    const listUsers = props.userList.map((user) =>
        <UserShortInfo key={user.id}
            userId={user.id}
            profilePic={user.profilePic} 
            firstName={user.firstName} 
            lastName={user.lastName} 
            industry={user.industry}/>
    );

    return (
        listUsers
    );
}