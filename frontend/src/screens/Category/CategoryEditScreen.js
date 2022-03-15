import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { updateCategory,listCategoryDetails } from '../../actions/categoryActions'
import { CATEGORY_UPDATE_RESET } from '../../constants/categoryConstants'

const CategoryEditScreen = ({ match, history }) => {
    const categoryId = match.params.id;
    const [categoryName, setCategoryName] = useState('')
    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState(0)

    const dispatch = useDispatch()
    const categoryDetails = useSelector((state) => state.categoryDetails)
    const { loading, error, category } = categoryDetails;
    const categoryUpdate = useSelector((state) => state.categoryUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = categoryUpdate;


    useEffect(() => {
        if (successUpdate) {
          dispatch({ type: CATEGORY_UPDATE_RESET })
          history.push('/admin/categorylist')
        } else {
          if (!category.categoryName || category._id !== categoryId) {
            dispatch(listCategoryDetails(categoryId))
          } else {
            console.log(category)
            setCategoryName(category.categoryName)
            setTitle(category.title)
            // setImage(product.image)
            setPriority(category.priority)
           
          }
        }
    }, [dispatch, history, categoryId, category, successUpdate])
    
    
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateCategory({
        _id: categoryId,
        categoryName,
        title,
        priority,
      })
    );
    }
    
    return (
        <>
          <Link to="/admin/categorylist" className="btn btn-light my-3">
            Go Back
          </Link>
          <FormContainer>
            <h1>Edit Category</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="categoryName">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter category name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
    
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></Form.Control>
                </Form.Group>
    
                <Form.Group controlId="priority">
                  <Form.Label>Priority</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  ></Form.Control>
                </Form.Group>
    
               
    
                
    
                
    
               
    
                <div className="d-flex bd-highlight mb-3">
                  <div className="mr-auto p-2 bd-highlight">
                    {' '}
                    <Button type="submit" variant="primary">
                      Update
                    </Button>
                  </div>
    
                 
                </div>
              </Form>
            )}
          </FormContainer>
        </>
      );
}

export default CategoryEditScreen