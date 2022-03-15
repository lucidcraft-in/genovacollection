import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSubCategory } from '../../actions/subcategoryAction';

const SubCategoryCreate = ({ history }) => {
  const [name, setName] = useState('');
  const [tittle, setTittle] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();

  console.log(category);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createSubCategory({
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
                Create
              </Button>
            </div>
          </div>
        </Form>
      </FormContainer>
    </>
  );
};


export default SubCategoryCreate