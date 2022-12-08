// library
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
// css 
import '../../../assets/css/product-card.css'
import { addItem } from '../../../redux/reducers/productReducer'

const ProductCard = ({ product }) => {

  const dispatch = useDispatch()
  const { image, price, name, id } = product

  // Add product to cart
  const handleAddToCart = () => {
    dispatch(addItem({
      id,
      name,
      image,
      price
    }))
  }

  return (
    <div className='product__item'>
      <div className="product__img">
        <motion.img whileHover={{ scale: 1.2 }}
          className='w-50' src={image} alt="" />
      </div>
      <div className='product__content'>
        <h5>
          <Link to={`/detail/${id}`}>{name}</Link>
        </h5>
        <div className='d-flex align-items-center justify-content-between'>
          <span className='product__price'>
            ${price}
          </span>
          
          <motion.button whileTap={{scale: 1.2}} onClick={handleAddToCart} className='addToCart__btn'>
            Add to Cart
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard