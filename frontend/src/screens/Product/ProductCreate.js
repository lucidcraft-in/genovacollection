import React, { useState, useEffect  } from 'react';

import { Link } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import SetImage from '../../components/Product/setImage';
import SetStock from '../../components/Product/setStock';
import { useDispatch, useSelector} from 'react-redux';

import {

  createProduct,
} from '../../actions/productActions';
import { listCategories, createCategory,deleteCategory } from "../../actions/categoryActions";
import './Product.css';

const ProductCreateScreen = ({history}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0); ;
   const [sellingPrice, setSellingPrice] = useState(0);
  const [promotionPercentage, setPromotionCodePercentage] = useState(0);
  const [imagesArray, setImagesArray] = useState([
    {
      color: '#000000',
      url: '',
    },
  ]);
    const [stockArray, setStockArray] = useState([
      {
        size: '',
      },
    ]);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
   const [duplicateSize, setDuplicateSize] = useState(false);

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
   

  
  let stockCount = stockArray.map((stock, index) => (
    <div key={index} className="card p-2 mt-1">
      <SetStock
        stockIndex={index}
        setStockArray={setStockArray}
        stockArray={stockArray}
      />
    </div>
  ));

 
  useEffect(() => {

      dispatch(listCategories(''))
   
  }, [
    dispatch,
    history,

  ])
 

  const submitHandler = (e) => {
    e.preventDefault();

    let error = false;
    stockArray.map((size) => {
      let duplicate = stockArray.filter((e) => e.size === size.size);

    
      if (duplicate.length > 1) {
        
        setDuplicateSize(true)
        error = true;
        
      }
      })
  
    
    if (error === true) {
      return;
    }


   
    dispatch(
      createProduct({
        name,
        price,
        sellingPrice,
        imagesArray,
        brand,
        category,
        description,
        countInStock,
        stockArray,
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
 setImagesArray([...imagesArray, obj]);
  }

    const addSize = () => {
      let obj = {
        size: '',
      };

      setStockArray([...stockArray, obj]);
    };

 
    
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
            <Form.Label>M R P</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required={true}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Selling Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Selling price"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
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
          <Form.Label>
            <b>Size</b>
          </Form.Label>
          <Card className="p-2">
            {' '}
            {stockCount}
            <div className="d-flex bd-highlight mb-3">
              <div className="mr-auto p-2 bd-highlight"></div>

              <div className="p-2 bd-highlight">
                <a onClick={addSize} className="pointer">
                  {' '}
                  <i
                    aria-hidden="true"
                    className="text-success fa fa-plus "
                  ></i>{' '}
                  Add Size
                </a>
              </div>
            </div>
          </Card>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>

            <Form.Control
              as="select"
              onChange={(e) => setCategory(e.target.value)}
              required={true}
            >
              <option>Select Category</option>
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
          {duplicateSize ? <div>Size should be unique</div> : ''}
        </Form>
      </FormContainer>
    </>
  );
};


export default ProductCreateScreen;