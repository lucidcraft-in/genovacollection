import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import {
  listSubCategories,
  deleteSubCategory,
  createSubCategory,
} from '../../actions/subcategoryAction';

import { SUB_CATEGORY_CREATE_RESET } from '../../constants/subCategoryConstant';

const SubCategoryList = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const subCategoryList = useSelector((state) => state.subCategoryList);
  const { loading, error, subCategories, page, pages } = subCategoryList;

    
  const subCategoryDelete = useSelector((state) => state.subCategoryDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = subCategoryDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: SUB_CATEGORY_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    dispatch(listSubCategories('', pageNumber));
  }, [dispatch, history, userInfo, pageNumber]);
   


    const deleteHandler = (id) => {
      if (window.confirm('Are you sure')) {
        dispatch(deleteSubCategory(id));
      }
  };
  

  return (
    <>
      {' '}
      <Row className="align-items-center">
        <Col>
          <h1>Sub Category</h1>
        </Col>
        <Col className="text-right">
          <LinkContainer to={`/admin/subcategory/create`}>
            <Button className="my-3">
              <i className="fas fa-plus"></i> Create Sub-category
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {/* {loadingCreate && <Loader />} */}
      {/* {errorCreate && <Message variant="danger">{errorCreate}</Message>} */}
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
                <th>TITTLE</th>
                <th>CATEGORY</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {subCategories.map((sub) => (
                <tr key={sub._id}>
                  <td>{sub.name}</td>
                  <td> {sub.tittle}</td>
                  <td> {sub.category_[0].categoryName}</td>

                  <td>
                    <LinkContainer to={`/admin/subcategory/${sub._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(sub._id)}
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

export default SubCategoryList
