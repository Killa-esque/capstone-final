import React, { Fragment, useEffect, useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Table, Container } from 'reactstrap';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import '../../assets/css/profile.css'
// components
import CommonSection from "../../components/UI/Common Section/CommonSection";
import Helmet from "../../components/Helmet/Helmet";
import { USER_PROFILE, getStoreJson, USER_LOGIN } from '../../util/config';
import { getProfileApi } from "../../redux/reducers/userReducer";
import { deleteItem } from '../../redux/reducers/productReducer';
const UserOrdered = () => {
  const disatch = useDispatch();

  const { userOrderHistory, userFavorite, userProfile } = useSelector((state) => state.userReducer);
  const getProfile = getStoreJson(USER_PROFILE);
  const [profile, setProfile] = useState(getProfile);
  const [activeTab, setactiveTab] = useState('1');
  const [pageNumber, setPageNumber] = useState(0);
  const [productData, setProductData] = useState(profile);
  const dispatch = useDispatch();


  // Number of product for each page
  const productPerTab = 3;
  // Get the visited page
  const vistedPage = pageNumber * productPerTab;
  // Show the product each page
  const displayPage = productData?.ordersHistory.slice(
    vistedPage,
    vistedPage + productPerTab
  );
  const pageCount = Math.ceil(productData?.ordersHistory?.length / productPerTab);
  // Function to paginate
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    disatch(getProfileApi())
  }, [])

  useEffect(() => {
    setProfile(getProfile);
  }, [userProfile]);

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  }
  return (
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
                    {productData?.ordersHistory?.length !== 0 ? (
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
                                {userFavorite?.productsFavorite?.map((item, index) => {
                                  // return <Tr item={item} key={index} />;
                                  return (
                                    <tr className="text-center">
                                      <td className="cart__img-box">
                                        <img src={item.image} alt="" />
                                      </td>
                                      <td style={{ verticalAlign: 'middle' }}>{item.name}</td>
                                      <td style={{ verticalAlign: 'middle' }}>${item.price}</td>
                                      <td className="cart__item-del" style={{ verticalAlign: 'middle' }}>
                                        <span onClick={() => {
                                          dispatch(deleteItem(item.id));
                                        }}>
                                          <i className="ri-delete-bin-line"></i>
                                        </span>
                                      </td>
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
  )
}

export default UserOrdered;
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
