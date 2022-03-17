import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import Product from '../../components/Home/Product';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import ProductCarousel from '../../components/ProductCarousel';
import Meta from '../../components/Meta';
import {
  listProducts,
  listProductsByCAtegoryPriority,
} from '../../actions/productActions';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productHomeList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProductsByCAtegoryPriority());
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {products?.map((product) => (
            <Container key={product._id} className="mt-5">
              <Row className="justify-content-md-center">
                <Col md="auto">
                  {' '}
                  <h5>{product.category}</h5>
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <h3>{product.title}</h3>
                </Col>
              </Row>
              <Row>
                {product.product.slice(0, 8).map((item) => (
                  <Col sm={3} key={item._id}>
                    <Product product={item} />
                  </Col>
                ))}
              </Row>
              {product.product.length >= 8 ?
                <Row className="justify-content-md-center">
                  <Col md="auto">
                    {' '}
                    <h4>show more..</h4>
                  </Col>
                </Row> : ''}
            </Container>
          ))}
        </>
      )}
    </>
  );
};

export default HomeScreen;
