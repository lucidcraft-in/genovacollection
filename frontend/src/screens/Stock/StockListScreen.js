import React, { useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import { listStock, deleteStock, createStock } from '../../actions/stockAction';

 

const StockListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

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

  useEffect(() => {
    

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      
    } else {
      dispatch(listStock('', pageNumber));
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
  return (
    <>
      {' '}
      <Row className="align-items-center">
        <Col>
          <h1>Stocks</h1>
        </Col>
        <Col className="text-right">
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
              {stocks.map((stock) => (
                <tr key={stock._id}>
                  <td>{stock.product_[0].name}</td>
                  <td> {stock.size}</td>
                  <td >
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
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default StockListScreen;
