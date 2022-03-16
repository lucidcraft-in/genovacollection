import React, { useState, useEffect  } from 'react';

import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import SetImage from '../../components/Product/setImage';
import { useDispatch, useSelector} from 'react-redux';

import {

  createProduct,
} from '../../actions/productActions';
import { listCategories, createCategory,deleteCategory } from "../../actions/categoryActions";
import './Product.css';

const ProductCreateScreen = ({history}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [promotionPercentage, setPromotionCodePercentage] = useState(0);
  const [imagesArray, setImagesArray] = useState([
    {
      color: '#000000',
      url: '',
    },
  ]);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const categoryList = useSelector((state) => state.categoryList)
  const { loading, error, categories } = categoryList;

  const dispatch = useDispatch();





  let images = imagesArray.map((image, index) => (
    <div key={index} className="card p-2 mt-1">
      <SetImage
        imageIndex={index}
        setImagesArray={setImagesArray}
        imagesArray={imagesArray}
      />
    </div>
  ));
   

 
  useEffect(() => {
   
   
      dispatch(listCategories(''))
   
  }, [
    dispatch,
    history,
   
   
   
  ])
  console.log("check categoriessss");
  console.log(categories);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        price,
        imagesArray,
        brand,
        category,
        description,
        countInStock,
        promotionPercentage,
      })
    );
     
    history.push('/admin/productlist');
  };
 

  const addImage = () => {
   
    let obj = {
      color: '#000000',
      url: '',
    };

    setImagesArray([...imagesArray, obj])
    

  }

 
    
  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Create Product</h1>
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

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required={true}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required={true}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              required={true}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>

            <Form.Control
              as="select"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((obj) => (
                <option value={obj._id}>{obj.categoryName}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="promotionCodePercentage">
            <Form.Label>Promotion Offer Percentage</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Promotion Offer Percentage"
              value={promotionPercentage}
              onChange={(e) => setPromotionCodePercentage(e.target.value)}
              required={true}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required={true}
            ></Form.Control>
          </Form.Group>
          <hr />

          {images}
          <div className="d-flex bd-highlight mb-3">
            <div className="mr-auto p-2 bd-highlight">
              {' '}
              <Button type="submit" variant="primary" className="mt-3">
                Create
              </Button>
            </div>

            <div className="p-2 bd-highlight">
              <a onClick={addImage} className="pointer">
                {' '}
                <i
                  aria-hidden="true"
                  className="text-success fa fa-plus "
                ></i>{' '}
                Add image
              </a>
            </div>
          </div>
        </Form>
      </FormContainer>
    </>
  );
};


export default ProductCreateScreen;