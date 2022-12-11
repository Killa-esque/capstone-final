import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
// components
import Header from '../components/Header/Header'
import Carts from '../components/UI/Cart/Carts'
import Footer from '../components/Footer/Footer'

const HomeTemplate = () => {
  const { cartIsVisible } = useSelector(state => state.cartUI)

  return (
    <>
      <Header />
      {/* Show Cart */}
      {cartIsVisible && <Carts />}
      <Outlet style={{ minHeight: '90vh' }} />
      <Footer />
    </>
  )
}

export default HomeTemplate
