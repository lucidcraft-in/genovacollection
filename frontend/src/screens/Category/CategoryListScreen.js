import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { listCategories, createCategory,deleteCategory } from "../../actions/categoryActions";

import { CATEGORY_CREATE_RESET } from "../../constants/categoryConstants";


const CategoryListScreen = ({ history, match }) => {
    const dispatch = useDispatch()
    const categoryList = useSelector((state) => state.categoryList)
    const { loading, error, categories } = categoryList;

    const categoryDelete = useSelector((state) => state.categoryDelete)

    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
      } = categoryDelete

    console.log(categories)

    const categoryCreate = useSelector((state) => state.categoryCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        category: createCategory,
    } = categoryCreate;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: CATEGORY_CREATE_RESET })
    
        if (!userInfo || !userInfo.isAdmin) {
          history.push('/login')
        }
    
        if (successCreate) {
          history.push(`/admin/category/${createCategory._id}/edit`)
        } else {
          dispatch(listCategories(''))
        }
      }, [
        dispatch,
        history,
        userInfo,
        successDelete,
        successCreate,
        createCategory,
       
    ])
    
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
          dispatch(deleteCategory(id))
        }
      }

    const createCategoryHandler = () => {
        dispatch(createCategory())
    }
    
    return (
        <>
          <Row className="align-items-center">
            <Col>
              <h1>Categories</h1>
            </Col>
            <Col className="text-right">
              <LinkContainer to={`/admin/category/create`}>
                <Button className="my-3">
                  <i className="fas fa-plus"></i> Create Category
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
                    <th>ID</th>
                    <th>CATEGORY NAME</th>
                    <th>TITLE</th>
                    <th>PRIORITY</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category._id}>
                      <td>{category._id}</td>
                      <td>{category.categoryName}</td>
                      <td> {category.title}</td>
                      <td>{category.priority}</td>
                    
                      <td>
                        <LinkContainer to={`/admin/category/${category._id}/edit`}>
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(category._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
            </>
          )}
        </>
      );
}
export default CategoryListScreen