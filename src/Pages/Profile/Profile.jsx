import React from 'react'
import UserProfile from '../../components/Profile/UserProfile'
import UserOrdered from '../../components/UserOrdered/UserOrdered'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { getNewProfile } from '../../redux/reducers/userReducer'


const Profile = () => {
  const { userProfile } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const handleUpdateProfile = () => {
    const action = getNewProfile({
      email: "phuvinh133@gmail.com",
      password: "123",
      name: "Vinh",
      gender: true,
      phone: "0332123743"
    });
    dispatch(action)
  }
  return (
    <>
      <UserProfile />
      <section style={{ backgroundColor: '#eee', padding: '0 0 0 0' }}>
        <div className='container d-flex justify-content-end'>
          <motion.button whileTap={{ scale: 1.2 }} onClick={handleUpdateProfile} className='addToCart__btn'>
            Update Profile
          </motion.button>
        </div>
      </section>
      <UserOrdered />
    </>
  )
}

export default Profile
