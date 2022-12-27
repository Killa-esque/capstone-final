import React from 'react'
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { getSortBy } from '../../redux/reducers/userReducer';
import "../../assets/css/button-submit.css"
import { clearCart } from '../../redux/reducers/productReducer';
const CartProfile = () => {

  const { sortBy, sortByTypes } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()
  const { productCart } = useSelector(state => state.products);

  return (
    <section className="h-100" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <MDBTypography tag="h3" className="fw-normal mb-0 text-black text-center">
                Shopping Cart
              </MDBTypography>
              <div>
                <p className="mb-0">
                  <span className="text-muted">Sort by:</span>
                  <div className="dropdown open mx-2" style={{ display: 'inline' }} >
                    <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {sortBy}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="triggerId">
                      {sortByTypes.map((types, index) => {
                        return (
                          <button className="dropdown-item" onClick={() => {
                            const action = getSortBy(types);
                            dispatch(action);
                          }} key={index}>{types}</button>
                        )
                      })}
                    </div>
                  </div>
                </p>
              </div>
            </div>

            {productCart.map((products, index) => {
              console.log(products)
              return <CartItem products={products} key={index} />
            })}

            <div className=''>

            </div>

          </MDBCol>
        </MDBRow>
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="10">
            <div className='d-flex align-items-center' style={{ gap: '20px' }}>
              <button className='btn-grad' style={{ margin: 0 }} onClick={() => {
                console.log('clear all')
                const action = clearCart([])
              }}>CLEAR ALL</button>
              <button class="glow-on-hover" type="button">SUBMIT YOUR ORDER</button>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer >
    </section >
  )
}

export default CartProfile
