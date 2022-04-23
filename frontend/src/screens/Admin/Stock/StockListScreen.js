import React, { useEffect , useState } from 'react';
import { Table, Button, Row, Col, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../../components/Message';
import Loader from '../../../components/Loader';
import Paginate from '../../../components/Paginate';
import { listStock, deleteStock, createStock } from '../../../actions/stockAction';
import {listProducts} from '../../../actions/productActions';

 import Sidebar from '../Sidebar';

const StockListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const [stockLists, setStockList] = useState([]);

  const dispatch = useDispatch();

  const stockList = useSelector((state) => state.stockList);
  const { loading, error, stocks, page, pages } = stockList;

  const stockDelete = useSelector((state) => state.stockDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = stockDelete;

  const stockCreate = useSelector((state) => state.stockCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    stock: createdStock,
  } = stockCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

    const productList = useSelector((state) => state.productList);
  const { products } = productList;
  

  useEffect(() => {
   

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      
    } else { 
      dispatch(listStock('', pageNumber));
      dispatch(listProducts(''));
    }
  
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdStock,
    pageNumber,
  ]);

 

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteStock(id));
    }
  };

  const changeProduct = (value) => {
    
    const stocks_ = stocks.filter((e) => e.product === value);
    setStockList(stocks_);
  }
  return (
    <div>
      <Sidebar />
      <div className="main">
        <>
          {' '}
          <Row className="align-items-center">
            <Col md={6}>
              <span className="header">Stocks</span>
            </Col>
            <Col md={3}>
              <Form.Control
                as="select"
                // value={product}
                onClick={(e) => changeProduct(e.target.value)}
                required={true}
              >
                <option>Select Product</option>
                {products.map((obj) => {
                  if (stocks.filter((e) => e.product === obj._id).length === 0)
                    return;
                  return (
                    <option value={obj._id} key={obj._id}>
                      {obj.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Col>
            <Col className="text-right" md={3}>
              <LinkContainer to={`/admin/stock/create`}>
                <Button className="my-3">
                  <i className="fas fa-plus"></i> Create Stock
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
                    <th>PRODUCT NAME</th>
                    <th>SIZE</th>
                    <th>COLOR</th>
                    <th>COUNT</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {(stockLists.length > 0 ? stockLists : stocks).map(
                    (stock) => (
                      <tr key={stock._id}>
                        <td>{stock.product_[0].name}</td>
                        <td> {stock.size}</td>
                        <td>
                          <div
                            className="dot mr-1 pointer"
                            style={{ backgroundColor: stock.color }}
                          ></div>
                        </td>
                        <td>{stock.count}</td>
                        <td>
                          <LinkContainer to={`/admin/stock/edit/${stock._id}`}>
                            <Button variant="light" className="btn-sm">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </LinkContainer>
                          <Button
                            variant="danger"
                            className="btn-sm"
                            onClick={() => deleteHandler(stock._id)}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </td>
                      </tr>
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
};

export default StockListScreen;
