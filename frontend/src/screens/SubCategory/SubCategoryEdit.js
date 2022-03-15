import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SUB_CATEGORY_UPDATE_RESET } from '../../constants/subCategoryConstant';
import {
  listSubCategoryDetails,
  updateSubCategory,
} from '../../actions/subcategoryAction';

const SubCategoryEdit = ({ history, match }) => {
  const subCategoryId = match.params.id;
  
  const [name, setName] = useState('');
  const [tittle, setTittle] = useState('');
  const [category, setCategory] = useState('weert');

  const dispatch = useDispatch();
  
    const subCategoryDetails = useSelector((state) => state.subCategoryDetails);
    const { loading, error, subCategory } = subCategoryDetails;

    const subcategoryUpdate = useSelector((state) => state.subCategoryUpdate);
    const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    } = subcategoryUpdate;

  console.log(subCategory);
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SUB_CATEGORY_UPDATE_RESET });
      history.push('/admin/subcategories');
    } else {
      if (!subCategory.name || subCategory._id !== subCategoryId) {
        dispatch(listSubCategoryDetails(subCategoryId));
      } else {
        setName(subCategory.name);
        setTittle(subCategory.tittle);
        setCategory(subCategory.category);
      }
    }
  }, [dispatch, history, subCategoryId, subCategory, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
     dispatch(
       updateSubCategory({
         _id: subCategoryId,
         name,
         tittle,
         category,
       })
     );

    history.push('/admin/subcategories');
  };

  const array = [
    {
      _id: 'asasasas',
      name: 'General',
    },
    {
      _id: 'weert',
      name: 'Featured',
    },
    {
      _id: 'wwww',
      name: 'Sandles',
    },
  ];

  return (
    <>
      <Link to="/admin/promotions" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Create Sub category</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={true}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="tittle">
            <Form.Label>Tittle</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Tittle"
              value={tittle}
              onChange={(e) => setTittle(e.target.value)}
              required={true}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Parent Category</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setCategory(e.target.value)}
            >
              {array.map((obj) => (
                <option value={obj._id}>{obj.name}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <div className="d-flex bd-highlight mb-3">
            <div className="mr-auto p-2 bd-highlight">
              {' '}
              <Button type="submit" variant="primary" className="mt-3">
                Update
              </Button>
            </div>
          </div>
        </Form>
      </FormContainer>
    </>
  );
};


export default SubCategoryEdit