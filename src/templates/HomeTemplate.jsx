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
      {/* cartIsVisible = true => show Cart */}
      {cartIsVisible && <Carts />}
      <Outlet />
      <Footer />
    </>
  )
}

export default HomeTemplate
