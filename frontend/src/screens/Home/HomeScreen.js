import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import Product from '../../components/Home/Product';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import ProductCarousel from '../../components/Carousel/ProductCarousel';
import Meta from '../../components/Meta';
import {
  listProducts,
  listProductsByCAtegoryPriority,
} from '../../actions/productActions';
 import PreLoader from '../../components/Home/PreLoader';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productHomeList);
  const { loading, error, products } = productList;

 

  useEffect(() => {

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
    /* you can also use 'auto' behaviour
          in place of 'smooth' */
  });

    dispatch(listProductsByCAtegoryPriority(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

console.log(products);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        // <PreLoader/>
        <Link to="/" className="btn btn-light">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
        </Link>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Loader />
      ) : products.length === 0 ? (
        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <span className="no-product-fount ">No Products found !</span>
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          {products?.map((product, index) => (
            <Container
              key={product._id}
              className={
                index/2 == 0
                  ? 'mt-5 home-page-container'
                  : 'mt-5 home-page-container home-page-container'
              }
            >
              <Row className="d-flex justify-content-center">
                <Col md="auto" xs="auto">
                  {' '}
                  <h5>{product.category}</h5>
                </Col>
              </Row>
              <Row className="d-flex justify-content-center">
                <Col md="auto" xs="auto">
                  <h3>{product.title}</h3>
                </Col>
              </Row>

              <Row>
                {product.product.slice(0, 8).map((item) => (
                  <Col sm={6} md={3} xs={6} lg={3} key={item._id}>
                    <Product product={item} />
                  </Col>
                ))}
              </Row>
              {product.product.length >= 8 ? (
                <Row className="d-flex justify-content-center mb-3">
                  <Col md="auto">
                    {' '}
                    <Link
                      to={`/category/${product.product[0].category}`}
                      type="button"
                      className="btn btn-secondary btn-sm"
                    >
                      View all
                    </Link>
                  </Col>
                </Row>
              ) : (
                ''
              )}
            </Container>
          ))}
        </>
      )}
    </>
  );
};

export default HomeScreen;
