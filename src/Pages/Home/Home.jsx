// library
import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
// components
import Helmet from "../../components/Helmet/Helmet";
import Service from "../../components/Service/Service";
import ProductCard from "../../components/UI/ProductCard/ProductCard";
// css
import "../../assets/css/hero-section.css";
import "../../assets/css/home.css";
// store redux
import {
  getAllProductsApi,
  getAllProductsByCategoryApi,
} from "../../redux/reducers/productReducer";

const Home = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.products);

  //  Handling product rendering by category
  const handleGetProductByCategory = (id) => {
    const action = getAllProductsByCategoryApi(id);
    dispatch(action);
  };

  // Get all product list from API
  const handleGetProducts = () => {
    const action = getAllProductsApi();
    dispatch(action);
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <Helmet title="Home">
      <section>
        {/* ================= Carousel ============= */}
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <h5 className="mb-3">Super charge your progress</h5>
                <h1 className="mb-4 hero__title">
                  <span>WANNA?</span> Beat the <br /> buzzer{" "}
                  <span> at bellow</span>
                </h1>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Beatae at voluptatem aperiam, quod soluta sequi?
                </p>
                <div className="hero__btns d-flex align-items-center gap-5 mt-4">
                  <motion.button
                    whileTap={{ scale: 1.1 }}
                    className="order__btn d-flex align-items-center justify-content-between"
                  >
                    Order now
                    <i className="ri-arrow-right-s-line"></i>
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 1.1 }}
                    className="all__products-btn"
                  >
                    <Link to="/products">See all shoes</Link>
                  </motion.button>
                </div>
                <div className="d-flex align-items-center gap-5 mt-5 hero__service">
                  <p className="d-flex align-items-center gap-2">
                    <span className="shipping__icon">
                      <i className="ri-car-line"></i>
                    </span>
                    <span> No shipping charge</span>
                  </p>
                  <p className="d-flex align-items-center gap-2">
                    <span className="shipping__icon">
                      <i className="ri-shield-check-line"></i>
                    </span>
                    <span> 100% secure checkout</span>
                  </p>
                </div>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img
                  src="https://shop.cyberlearn.vn/images/adidas-super-star-red.png"
                  alt="hero-img"
                  className="w-100 "
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= Serivce ============= */}
      <section className="pt-0">
        <Service />
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h5 className="feature__subtitle mb-4">
                Who are you shopping for?
              </h5>
              <h2 className="feature__title">Gift for you, from you</h2>
              <h2 className="feature__title">
                You work hard <span>gift hard</span>
              </h2>
              <p className="mb-1 mt-4 feature__text">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque,
                odio?
              </p>
              <p className="feature__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Assumenda, eius.
              </p>
            </Col>

            <Col lg="4" md="4">
              <div className="feature__item"></div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ================= Product List ============= */}
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="12">
              <div className="product__category d-flex align-items-center justify-content-center gap-5">
                <motion.button
                  whileFocus={{
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                    color: "#df2020",
                  }}
                  onClick={handleGetProducts}

                >
                  All
                </motion.button>
                <motion.button
                  whileFocus={{
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                    color: "#df2020",
                  }}
                  onClick={() => {
                    handleGetProductByCategory("NIKE");
                  }}
                >
                  Nike
                </motion.button>
                <motion.button
                  whileFocus={{
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                    color: "#df2020",
                  }}
                  onClick={() => {
                    handleGetProductByCategory("ADIDAS");
                  }}
                >
                  Adidas
                </motion.button>
                <motion.button
                  whileFocus={{
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                    color: "#df2020",
                  }}
                  onClick={() => {
                    handleGetProductByCategory("VANS_CONVERSE");
                  }}
                >
                  Converse
                </motion.button>
              </div>
            </Col>

            {/* ==================== Product Card ==================== */}
            {productList.map((product, index) => {
              return (
                <Col key={index} lg="3" md="4" sm='6' xs='6' className="mt-5">
                  <ProductCard product={product} />
                </Col>
              );
            })}{" "}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
