import React from 'react'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useDispatch } from 'react-redux';
import { deleteItem } from '../../redux/reducers/productReducer';
const CartItem = (props) => {
  const dispatch = useDispatch();
  const { id, name, price, image, quantity, totalPrice } = props.products;


  return (
    <MDBCard className="rounded-3 mb-4" >
      <MDBCardBody className="p-4">
        <MDBRow className="justify-content-between align-items-center">
          <MDBCol md="2" lg="2" xl="2">
            <MDBCardImage className="rounded-3" fluid
              src={image}
              alt="..." />
          </MDBCol>
          <MDBCol md="3" lg="3" xl="3">
            <p className="lead fw-normal mb-2">{name}</p>
            <p>
              <span className="text-muted">Price: </span>{price}$
            </p>
          </MDBCol>
          <MDBCol md="3" lg="3" xl="2"
            className="d-flex align-items-center justify-content-around">
            <MDBInput min={0} className='text-center fs-bold' defaultValue={quantity} type="number" size="xs" />
          </MDBCol>
          <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
            <MDBTypography tag="h5" className="mb-0">
              {totalPrice}$
            </MDBTypography>
          </MDBCol>
          <MDBCol md="1" lg="1" xl="1" className="text-end">
            <span className="text-danger" onClick={() => {
              dispatch(deleteItem(id));
            }}>
              <MDBIcon fas icon="trash text-danger" size="lg" />
            </span>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard >
  )
}

export default CartItem
