import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Home/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import {
  listProducts,
  listProductsByCAtegoryPriority,
} from '../actions/productActions';

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
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products?.map((product) => (
              <Row key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Row>
                  <center>
                  <h1> {product.category}</h1>{' '}
                  </center>
                  </Row>

                {product.product.map((prod) => (
                  <Product product={prod} />
                ))}
              </Row>
            
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
