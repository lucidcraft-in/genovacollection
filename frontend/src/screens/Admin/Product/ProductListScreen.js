import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import Paginate from '../../../components/Paginate'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../../../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../../constants/productConstants'
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';
 import Sidebar from '../Sidebar';

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1


  const { t } = useTranslation();

  const currentLanguageCode = cookies.get('i18next') || 'en';

  const dispatch = useDispatch()


  const [productsList, setProductList] = useState([])
  const [searchValue, setSearch] = useState('')

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      // history.push(`/admin/product/edit/${createdProduct._id}`);
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
      //  history.push(`/admin/productlist`);
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  const search = (value) => {
    setSearch(value);
    let product_ = products.filter(
      (e) => e.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
      
 
    setProductList(product_);
  }

 
  

  return (
    <div>
      <Sidebar />
      <div className="main">
        <>
          <Row className="align-items-center">
            <Col md={6}>
              <span className="header">Products</span>
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                name="q"
                onChange={(e) => search(e.target.value)}
                placeholder={
                  currentLanguageCode === 'en'
                    ? t('search_product_english')
                    : t('search_product_arabic')
                }
                className="mr-sm-2 ml-sm-5"
              ></Form.Control>
            </Col>
            <Col className="text-right" md={3}>
              <LinkContainer to={`/admin/product/create`}>
                <Button className="my-3">
                  <i className="fas fa-plus"></i> Create Product
                </Button>
              </LinkContainer>
            </Col>
          </Row>
          {loadingDelete && <Loader />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {loadingCreate && <Loader />}
          {errorCreate && <Message variant="danger">{errorCreate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>PRICE</th>
                    {/* <th>CATEGORY</th> */}
                    <th>BRAND</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {(searchValue.length > 0 ? productsList : products).map(
                    (product) => (
                      // <LinkContainer to={`/admin/product/detail/${product._id}`}>
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>AED {product.price}</td>
                        {/* <td>{product.category}</td> */}
                        <td>{product.brand}</td>
                        <td>
                          <LinkContainer
                            to={`/admin/product/edit/${product._id}`}
                          >
                            <Button variant="light" className="btn-sm">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </LinkContainer>
                          <Button
                            variant="danger"
                            className="btn-sm"
                            onClick={() => deleteHandler(product._id)}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </td>
                      </tr>
                      // </LinkContainer>
                    )
                  )}
                </tbody>
              </Table>
              <Paginate pages={pages} page={page} isAdmin={true} />
            </>
          )}
        </>
      </div>
    </div>
  );
}

export default ProductListScreen
