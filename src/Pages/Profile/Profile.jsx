// import UserProfile from '../../components/Profile/UserProfile'
// import UserOrdered from '../../components/UserOrdered/UserOrdered'
//Hook
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

// Libraries
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Table, Container } from 'reactstrap';
import classnames from 'classnames';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { TextField } from "@mui/material";
import { motion } from 'framer-motion'
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";

// css
import '../../assets/css/profile.css'

// components
import CommonSection from "../../components/UI/Common Section/CommonSection";
import Helmet from "../../components/Helmet/Helmet";

// Redux & Localstorage
import { USER_PROFILE, getStoreJson, USER_LOGIN } from '../../util/config';
import { getFavoriteProduct, getProfileApi, updateProfile } from "../../redux/reducers/userReducer";
import { deleteItem } from '../../redux/reducers/productReducer';

// history
import { history } from '../../index';

// Create form & Validation
import { useFormik } from "formik";
import * as Yup from "yup";

// Notification
import { toast } from "react-toastify";


const Profile = () => {

  const disatch = useDispatch();

  const { userFavorite, userProfile } = useSelector((state) => state.userReducer);
  const getProfile = getStoreJson(USER_PROFILE);
  const [profile, setProfile] = useState(userProfile);
  const [activeTab, setactiveTab] = useState('1');
  const [pageNumber, setPageNumber] = useState(0);
  const dispatch = useDispatch();

  // Number of product for each page
  const productPerTab = 3;
  // Get the visited page
  const vistedPage = pageNumber * productPerTab;
  // Show the product each page
  const displayPage = profile?.ordersHistory.slice(
    vistedPage,
    vistedPage + productPerTab
  );
  // Calculate the page
  const pageCount = Math.ceil(profile?.ordersHistory?.length / productPerTab);
  // Function to paginate
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  // Change tab between User Orderd & User Favorite tab
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  }

  // Get favorite product
  const handleGetFavoriteProduct = () => {
    if (getStoreJson(USER_LOGIN)) {
      dispatch(getFavoriteProduct())
    }
    else {
      history.push('/login');
    }
  }

  // Load only once time
  useEffect(() => {
    disatch(getProfileApi())
  }, [])

  // Re-load when userProfile or userFavorite is updated
  useEffect(() => {
    handleGetFavoriteProduct();
    disatch(getProfileApi())
    setProfile(getProfile);
  }, [userProfile, userFavorite]);

  // Form & Validation
  const emailLocalStore = getStoreJson(USER_LOGIN)?.email;
  const formik = useFormik({
    initialValues: {
      email: profile?.email,
      password: profile?.password || '',
      name: profile?.name,
      gender: true,
      phone: profile?.phone,
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      try {
        if (values.email === emailLocalStore) {
          disatch(updateProfile(values));
        } else {
          toast.fail("Update profile fail");
        }
      }
      catch (error) {
        console.log(error);
      }
    },
  });


  return (
    <>
      <section style={{ backgroundColor: "#eee", padding: "50px 0 0 0" }}>
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                <MDBBreadcrumbItem>
                  <NavLink to="/">Home</NavLink>
                </MDBBreadcrumbItem>
                <MDBBreadcrumbItem to="/profile" active>
                  User Profile
                </MDBBreadcrumbItem>
              </MDBBreadcrumb>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4 pb-3">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src={profile?.avatar}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px", height: "150px" }}
                    fluid
                  />
                  <p className="text-muted mb-1 mt-2">
                    Hi, xin chào các bạn mình là {formik.values?.name}{" "}
                  </p>
                  <p className="text-muted mb-4">
                    Mình là học viên tại Cybersoft
                  </p>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <form action="" onSubmit={formik.handleSubmit}>
                    <MDBRow style={{ display: 'flex', alignItems: 'center' }}>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <TextField
                          id="outlined-basic"
                          value={formik.values.email}
                          label="Email"
                          variant="outlined"
                          className="form-control form-control-lg my-2"
                          name="email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.email && formik.errors.email ? (
                          <p className="text-danger">{formik.errors.email}</p>
                        ) : null}
                      </MDBCol>

                    </MDBRow>
                    <hr />
                    <MDBRow style={{ display: 'flex', alignItems: 'center' }}>
                      <MDBCol sm="3">
                        <MDBCardText>Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <TextField
                          id="outlined-basic"
                          value={formik.values.name}
                          label="Username"
                          variant="outlined"
                          className="form-control form-control-lg my-2"
                          name="name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.name && formik.touched.name ? (
                          <p className="text-warning">{formik.errors.name}</p>
                        ) : null}
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow style={{ display: 'flex', alignItems: 'center' }}>
                      <MDBCol sm="3">
                        <MDBCardText>Phone</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <TextField
                          id="outlined-basic"
                          value={formik.values.phone}
                          label="Phone Number"
                          variant="outlined"
                          className="form-control form-control-lg my-2"
                          name="phone"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />

                        {formik.errors.phone && formik.touched.phone ? (<p className="text-danger">{formik.errors.phone}</p>) : null}
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow style={{ display: 'flex', alignItems: 'center' }}>
                      <MDBCol sm="3">
                        <MDBCardText>Password</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <TextField
                          id="outlined-basic"
                          value={formik.values.password}
                          label="Password"
                          variant="outlined"
                          className="form-control form-control-lg my-2"
                          name="password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />{" "}
                        {formik.errors.password && formik.touched.password ? (
                          <p className="text-danger">{formik.errors.password}</p>
                        ) : null}
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3" style={{ display: 'flex', alignItems: 'center' }}>
                        <MDBCardText>Gender</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              defaultValue="true"
                              onChange={formik.handleChange}
                              defaultChecked
                              type="radio"
                              name="gender"
                              id="inlineRadio1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="inlineRadio1"
                            >
                              Male
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              onChange={formik.handleChange}
                              type="radio"
                              defaultValue="false"
                              name="gender"
                              id="inlineRadio2"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="inlineRadio2"
                            >
                              Female
                            </label>
                          </div>
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="12" style={{ display: 'flex', alignItems: 'center' }}>
                        <motion.button whileTap={{ scale: 1.2 }} type="submit" className="addToCart__btn fs-5 fw-bold">
                          Update
                        </motion.button>
                      </MDBCol>
                    </MDBRow>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <section className='p-5' style={{ backgroundColor: '#eee', padding: '50px 0 0 0' }}>
        <div className='container bg-white rounded-3 p-3 mb-4'>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}
              >
                Order history
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2'); }}
              >
                Favorite
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <Table>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profile?.ordersHistory?.length !== 0 ? (
                        <>
                          {displayPage?.map((order, index) => {
                            return (
                              <Fragment key={index}>
                                <tr>
                                  <td colSpan={12} className="order__date">
                                    <span>Order date:</span>{" "}
                                    {moment(order.date).format(
                                      "MMMM Do YYYY, h:mm:ss a"
                                    )}
                                  </td>
                                </tr>
                                <Tr item={order} />
                              </Fragment>
                            );
                          })}
                        </>
                      ) : (
                        <tr className='w-100 text-center fs-4 fw-bold'>
                          <td colSpan={6}>No product founded!!</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Col>
                <div>
                  <ReactPaginate
                    pageCount={pageCount}
                    onPageChange={changePage}
                    previousLabel="Prev"
                    nextLabel="Next"
                    containerClassName="paginationBtns"
                  />
                </div>

              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Helmet title="Cart">
                <CommonSection title={"Your Favorite"} />
                <section>
                  <Container>
                    <Row>
                      <Col lg="12">
                        {userFavorite?.length === 0 ? (
                          <div className="text-center">
                            <h5 className="mt-4">No products added to cart</h5>
                          </div>
                        ) : (
                          <table className="table">
                            <thead>
                              <tr className="text-center">
                                <th>Image</th>
                                <th>Product Name</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                <>
                                  {userFavorite?.productsFavorite?.map((item, index) => {
                                    return (
                                      <tr className="text-center" key={index}>
                                        <td className="cart__img-box">
                                          <img src={item.image} alt="" />
                                        </td>
                                        <td style={{ verticalAlign: 'middle' }}>{item.name}</td>
                                      </tr>
                                    )
                                  })}
                                </>
                              }
                            </tbody>
                          </table>
                        )}
                      </Col>
                    </Row>
                  </Container>
                </section>
              </Helmet>
            </TabPane>
          </TabContent>
        </div>
      </section>
    </>
  )
}
const Tr = ({ item }) => {
  return (
    <>
      {item.orderDetail.map((detail, index) => {
        const { name, price, image, quantity } = detail;
        return (
          <tr className="text-center profile__detail" key={index}>
            <td className="cart__img">
              <img src={image} alt="" />
            </td>
            <td>{name}</td>
            <td>{quantity}</td>
            <td>${price}</td>
          </tr>
        );
      })}
    </>
  );
};

export default Profile
