// library
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../../../src/index';

// css 
import '../../../assets/css/product-card.css'
import { addItem } from '../../../redux/reducers/productReducer'


const ProductCard = ({ product }) => {
  const { userLogin, userFavorite } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()
  const { image, price, name, id } = product

  // Add product to cart
  const handleAddToCart = () => {
    if (userLogin) {
      dispatch(addItem({
        id,
        name,
        image,
        price
      }))
    } else {
      history.push('/login')
    }
  }

  return (
    <div className='product__item position-relative'>
      {userFavorite?.map((items, index) => {
        if (items === product) {
          return (
            <i className='fa fa-heart position-absolute fs-5' style={{ top: '10%', right: '10%', color: 'red' }}></i>
          )
        }
        return <i className='fa fa-heart position-absolute fs-5' style={{ top: '10%', right: '10%', color: 'rgba(0, 0, 0, 0.1)' }}></i>
      })}
      <div className="product__img">
        <motion.img whileHover={{ scale: 1.2 }}
          className='w-50 mx-auto' src={image} alt="" />
      </div>
      <div className='product__content'>
        <h5>
          <Link to={`/detail/${id}`}>{name}</Link>
        </h5>
        <div className='d-flex align-items-center justify-content-between'>
          <span className='product__price'>
            ${price}
          </span>
          <motion.button whileTap={{ scale: 1.2 }} onClick={handleAddToCart} className='addToCart__btn'>
            Add to Cart
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
