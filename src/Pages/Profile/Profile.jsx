import React from 'react'
import UserProfile from '../../components/Profile/UserProfile'
import CartProfile from '../../components/CartProfile/CartProfile'
import UserOrdered from '../../components/UserOrdered/UserOrdered'


const Profile = () => {
  return (
    <>
      <UserProfile />
      <UserOrdered/>
    </>
  )
}

export default Profile
