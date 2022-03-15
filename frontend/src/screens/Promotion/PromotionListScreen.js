import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import {
  listPromotions,
  deletePromotion,
  createPromotion,
} from '../../actions/promotionAction';

import { PROMOTION_CREATE_RESET } from '../../constants/promotionConstant';


const PromotionListScreen = ({ history, match }) => {
   const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  
    const promotionList = useSelector((state) => state.promotionList);
  const { loading, error, promotions, page, pages } = promotionList;
  
  
  const promotionDelete = useSelector((state) => state.promotionDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = promotionDelete;

  const promotionCreate = useSelector((state) => state.promotionCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    promotion: createdPromotion,
  } = promotionCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

 

  useEffect(() => {
    dispatch({ type: PROMOTION_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/promotion/${createdPromotion._id}/edit`);
    } else {
      dispatch(listPromotions('', pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdPromotion,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deletePromotion(id));
    }
  };

  const createPromotionHandler = () => {
    dispatch(createPromotion());
  };

 

  return (
    <>
      {' '}
      <Row className="align-items-center">
        <Col>
          <h1>Promotions</h1>
        </Col>
        <Col className="text-right">
          <LinkContainer to={`/admin/promotion/create`}>
            <Button className="my-3">
              <i className="fas fa-plus"></i> Create promotion
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
                <th>PHONE</th>
                <th>PROMO CODE</th>
                 
                <th></th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promotion) => (
                <tr key={promotion._id}>
                 
                  <td>{promotion.name}</td>
                  <td> {promotion.phone}</td>
                  <td>{promotion.code}</td>
                 
                  <td>
                    <LinkContainer
                      to={`/admin/promotion/${promotion._id}/edit`}
                    >
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(promotion._id)}
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


export default PromotionListScreen;