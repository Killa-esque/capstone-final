import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Helmet from "../../components/Helmet/Helmet";
import CommonSection from "../../components/UI/Common Section/CommonSection";
import { useSelector, useDispatch } from "react-redux";
import { addItem, getProductById } from "../../redux/reducers/productReducer";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import "../../assets/css/product-detail.css";
import ProductCard from "../../components/UI/ProductCard/ProductCard";
import { getFavoriteProduct } from "../../redux/reducers/userReducer";
const Detail = () => {
  const { id } = useParams();
  const { productDetail } = useSelector((state) => state.products);
  const { name, image, price, quantity, description, shortDescription } = productDetail;

  const dispatch = useDispatch();
  const [tab, setTab] = useState("desc");
  const [previewImage, setPreviewImage] = useState(image);

  const getProductByIdApi = () => {
    dispatch(getProductById(id));
  };

  const handleAddItem = () => {
    dispatch(
      addItem({
        id,
        name,
        price,
        image,
      })
    );
  };
  const handleAddFavorite = () => {
    const action = getFavoriteProduct({
      id,
      name,
      price,
      quantity,
      image,
    })
    dispatch(action);
  };

  useEffect(() => {
    getProductByIdApi();
  }, [id]);

  useEffect(() => {
    setPreviewImage(image);
  }, [image]);

  // luôn scroll về đầu trang khi vào trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productDetail]);

  return (
    <>
      <Helmet title="Product-details">
        <CommonSection title={name} />

        <section className="pt-5">
          <Container>
            <Row>
              <Col lg="2" md="2">
                <div className="product__images">
                  {/* render ra hình ảnh của các sản phẩm có liên quan và sản phẩm hiện tại */}
                  {productDetail.relatedProducts
                    ?.slice(0, 2)
                    .map((image, index) => {
                      return (
                        <div className="img__item" key={index}>
                          <img
                            className="w-100"
                            src={image.image}
                            alt=""
                            onClick={() => setPreviewImage(image.image)}
                          />
                        </div>
                      );
                    })}
                  <div className="img__item">
                    <img
                      className="w-100"
                      src={image}
                      alt=""
                      onClick={() => setPreviewImage(image)}
                    />
                  </div>
                </div>
              </Col>

              {/* Chi tiết sản phẩm  */}
              <Col lg="4" md="4">
                <div className="product__main-img">
                  <img className="w-100" src={previewImage} alt="" />
                </div>
              </Col>
              <Col lg="6" md="6">
                <div className="single__product-content">
                  <h2 className="product__title mb-3">{name}</h2>
                  <p className="product__price mt-3 mb-4">
                    Price: <span>${price}</span>
                  </p>
                  <p className="size mb-3">
                    Sizes:{" "}
                    {productDetail.size?.map((item, index) => (
                      <motion.span whileTap={{ scale: 1.2 }} key={index}>
                        {item}
                      </motion.span>
                    ))}
                  </p>
                  <p className="product__short-desc mb-5">{shortDescription}</p>

                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    className="addToCart__btn mx-2"
                    onClick={handleAddItem}
                  >
                    Add to Cart
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    className="addToCart__btn mx-2"
                    onClick={handleAddFavorite}
                  >
                    Add to your favorite
                  </motion.button>
                </div>
              </Col>

              <Col lg="12">
                <div className="tabs d-flex align-items-center gap-5 py-2">
                  <h6
                    onClick={() => setTab("desc")}
                    className={`${tab === "desc" ? "tab__active" : ""}`}
                  >
                    Description
                  </h6>
                  <h6
                    className={`${tab === "review" ? "tab__active" : ""}`}
                    onClick={() => setTab("review")}
                  >
                    Review
                  </h6>
                </div>
                <div className="tab__content">
                  {/* // xử lý tab qua lại giữ desc và review  */}
                  {tab === "desc" ? (
                    <p>{description}</p>
                  ) : (
                    <div className="tab__form">
                      <div className="review">
                        <p className="user__name">Minh Thu</p>
                        <p className="user__email">minhthu3012000@gmail.com</p>
                        <p className="feedback__text">Great product!!</p>
                      </div>
                      <form
                        onSubmit={(e) => e.preventDefault()}
                        action=""
                        className="form"
                      >
                        <div className="form__group">
                          <input type="text" placeholder="Your name ...?" />
                        </div>
                        <div className="form__group">
                          <input type="text" placeholder="Enter your email" />
                        </div>
                        <div className="form__group">
                          <textarea
                            rows={5}
                            type="text"
                            placeholder="Give us your experience !"
                          />
                        </div>
                        <motion.button
                          whileTap={{ scale: 1.2 }}
                          className="addToCart__btn"
                        >
                          Submit
                        </motion.button>
                      </form>
                    </div>
                  )}
                </div>
              </Col>
              <Col lg="12" className="mb-5 mt-4">
                <h2 className="related__Product-title">You might also like</h2>
              </Col>
              {
                // render Product Card
                productDetail.relatedProducts?.map((product, index) => {
                  return (
                    <Col
                      lg="3"
                      md="4"
                      sm="6"
                      xs="6"
                      className="mb-4"
                      key={index}
                    >
                      <ProductCard product={product} />
                    </Col>
                  );
                })
              }
            </Row>
          </Container>
        </section>
      </Helmet>
    </>
  );
};

export default Detail;
