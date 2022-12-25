import React, { useEffect, useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Table, Container } from 'reactstrap';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
// components
import CommonSection from "../../components/UI/Common Section/CommonSection";
import Helmet from "../../components/Helmet/Helmet";
import { Tr } from '../../Pages/Cart/Cart';

const UserOrdered = () => {
  const { userOrderHistory, userFavorite, userProfile } = useSelector((state) => state.userReducer);
  const [activeTab, setactiveTab] = useState('1');
  const [pageNumber, setPageNumber] = useState(0);
  const [productData, setProductData] = useState(userOrderHistory);

  // Number of product for each page
  const productPerTab = 3;
  // Get the visited page
  const vistedPage = pageNumber * productPerTab;
  // Show the product each page
  const displayPage = productData?.slice(
    vistedPage,
    vistedPage + productPerTab
  );
  const pageCount = Math.ceil(productData?.length / productPerTab);
  // Function to paginate
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  // UseEffect to reload when every state is changed
  useEffect(() => {
    setProductData(userOrderHistory);
  }, [userOrderHistory]);
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
                      <th>ID</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productData?.length !== 0 ? (
                      <>
                        {displayPage?.map((values, index) => {
                          return (
                            <tr className='text-center'>
                              <td scope="row" style={{ verticalAlign: 'middle' }}>{index + 1}</td>
                              <td className='cart__img-box'>
                                <img className='w-100 h-100' src={values.image} alt="..." style={{ objectFit: 'contain', verticalAlign: 'middle' }} />
                              </td>
                              <td style={{ verticalAlign: 'middle' }}>{values.name}</td>
                              <td style={{ verticalAlign: 'middle' }}>{values.price}$</td>
                              <td style={{ verticalAlign: 'middle' }}>{values.quantity}</td>
                              <td style={{ verticalAlign: 'middle' }}>{values.quantity * values.price}$</td>
                            </tr>
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
                                {userFavorite?.map((item, index) => {
                                  return <Tr item={item} key={index} />;
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

export default UserOrdered
