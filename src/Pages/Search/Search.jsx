// library
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
//css
import "../../assets/css/search.css";
import "../../assets/css/pagination.css";
// components
import Helmet from "../../components/Helmet/Helmet";
import CommonSection from "../../components/UI/Common Section/CommonSection";
import ProductCard from "../../components/UI/ProductCard/ProductCard";
// redux
import {
  getAllProductsApi,
  getAllProductsByCategoryApi,
} from "../../redux/reducers/productReducer";

const Search = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.products);
  const [productData, setProductData] = useState(productList);

  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    dispatch(getAllProductsApi());
  }, []);

  useEffect(() => {
    setProductData(productList);
  }, [productList]);

  const handleSearch = (e) => {
    const { value } = e.target;
    // Kiểm tra gía trị nhập nhập có bao gồm trong tên sản phẩm hay không
    const searchedProducts = productList.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setProductData(searchedProducts);
  };

  // số lượng sản phẩm mỗi trang
  const productPerPage = 10;
  // trang đến: 0 * 10 = 0 trang
  const vistedPage = pageNumber * productPerPage;
  // hiển thị trang sản phẩm : danh sách sản phẩm từ vị trí (0, 9) nếu là trang 1
  // hoặc từ (10, 19) nếu là trang 2
  const displayPage = productData.slice(
    vistedPage,
    vistedPage + productPerPage
  );

  // hiển thị số phân trang
  const pageCount = Math.ceil(productData.length / productPerPage);

  // đổi trang hiển thị
  // selected tương ứng: trang 1: seleted 0, trang 2: selected: 1
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleFilterByCategory = (e) => {
    const { value } = e.target;
    dispatch(getAllProductsByCategoryApi(value));
  };

  return (
    <>
      <Helmet title="Shop">
        <CommonSection title="All Products" />

        <section>
          <Container>
            <Row>
              <Col lg="6" md="6" sm="6">
                <div className="search__widget d-flex align-items-center justify-content-between w-50">
                  <input
                    onChange={handleSearch}
                    type="text"
                    placeholder="I'm looking for...."
                  />
                  <span>
                    <i className="ri-search-line"></i>
                  </span>
                </div>
              </Col>
              <Col lg="6" md="6" sm="6" className="mb-5">
                <div className="sorting__widget text-end">
                  <select onChange={handleFilterByCategory}>
                    <option>Default</option>
                    <option value="NIKE">NIKE</option>
                    <option value="ADIDAS">ADIDAS</option>
                    <option value="VANS_CONVERSE">VANS &amp; CONVERSE</option>

                    <option value="high-price">High Price</option>
                    <option value="low-price">Low Price</option>
                  </select>
                </div>
              </Col>
              {productData.length !== 0 ? (
                <>
                  {displayPage.map((product, index) => {
                    return (
                      <Col
                        key={index}
                        lg="3"
                        md="4"
                        sm="6"
                        xs="6"
                        className="mb-4"
                      >
                        <ProductCard product={product} />
                      </Col>
                    );
                  })}
                </>
              ) : (
                <h5>No product founded!!</h5>
              )}

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
          </Container>
        </section>
      </Helmet>
    </>
  );
};

export default Search;
