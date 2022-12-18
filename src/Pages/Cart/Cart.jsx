import CartProfile from "../../components/CartProfile/CartProfile";
// library
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// components
import CommonSection from "../../components/UI/Common Section/CommonSection";
import Helmet from "../../components/Helmet/Helmet";
// css
import "../../assets/css/cart-page.css";
//redux
import { deleteItem } from "../../redux/reducers/productReducer";

const Cart = () => {
  const { totalAmount, productCart } = useSelector(
    (state) => state.products
  );

  // xử lý checkout
  const handleCheckout = (e) => {
    try {
      e.preventDefault()
      toast.success("Checkout completed successfully");

    } catch (error) {
      toast.error("Something went wrong! Try again later");

      console.log(error)
    }
  };

  return (
    <Helmet title="Cart">
      <CommonSection title={"Your Cart"} />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {productCart.length === 0 ? (
                <div className="text-center">
                  <h5 className="mt-4">No products added to cart</h5>
                </div>
              ) : (
                <table className="table ">
                  <thead>
                    <tr className="text-center">
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      <>
                        {productCart.map((item, index) => {
                          return <Tr item={item} key={index} />;
                        })}
                      </>
                    }
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Subtotal
                  <span className="fs-4 fw-bold">${totalAmount}</span>
                </h6>
              </div>
              <p className="small-desc mt-3">
                Taxes and shipping will calculate in checkout
              </p>
              <div className="cart__page-btn">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="buy__btn w-100"
                >
                  <Link to={"/search"}>Continue Shopping</Link>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="buy__btn w-100 mt-3"
                >
                  <Link to='/' onClick={handleCheckout}>
                    Checkout
                  </Link>
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Cart;

const Tr = ({ item }) => {
  const { id, image, name, price, quantity } = item;
  const dispatch = useDispatch();

  const handleDeleteItem = () => {
    dispatch(deleteItem(id));
  };
  return (
    <tr className="text-center">
      <td className="cart__img-box">
        <img src={image} alt="" />
      </td>
      <td>{name}</td>
      <td>${price}</td>
      <td>{quantity}</td>
      <td className="cart__item-del">
        <span onClick={handleDeleteItem}>
          <i className="ri-delete-bin-line"></i>
        </span>
      </td>
    </tr>
  );
};
