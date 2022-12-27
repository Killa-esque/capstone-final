// library
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../../../src/index';

// css 
import '../../../assets/css/product-card.css'
import { addItem } from '../../../redux/reducers/productReducer'
import { getLikeProduct, getUnLikeProduct } from '../../../redux/reducers/userReducer';

const ProductCard = ({ product, setFave, removeFave, idProd, userFavorite }) => {
  const { userLogin } = useSelector(state => state.userReducer)
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



  // const setFave = (id) => {
  //   console.log(id)
  //   dispatch(getLikeProduct(id))
  // }
  // const removeFave = (id) => {
  //   dispatch(getUnLikeProduct(id))

  // }

  const handleFave = () => {
    console.log('item.id')
    const existingItem = userFavorite?.productsFavorite?.find(
      (item) => {
        return item.id === id
      }
    );
    console.log(existingItem)
    if (existingItem) {
      return (
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="position-absolute btn-like"
          onClick={removeFave(idProd)}
        >
          <i className='fa fa-heart fs-5' style={{ color: 'red' }}></i>
        </motion.button>
      )
    }
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="position-absolute btn-unlike"
        onClick={setFave(idProd)}
      >
        <i className='fa fa-heart fs-5' style={{ color: 'rgba(0, 0, 0, 0.1)' }}></i>
      </motion.button>
    )

  }

  useEffect(() => {
    handleFave();
  }, [userFavorite])


  return (
    <div className='product__item position-relative'>
      {handleFave()}
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
