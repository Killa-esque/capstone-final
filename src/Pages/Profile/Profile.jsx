import React from 'react'
import UserProfile from '../../components/Profile/UserProfile'
import UserOrdered from '../../components/UserOrdered/UserOrdered'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { getNewProfile } from '../../redux/reducers/userReducer'


const Profile = () => {
  return (
    <>
      <UserProfile />
      <UserOrdered />
    </>
  )
}

export default Profile
