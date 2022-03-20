import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
 import { useDispatch,useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import {
  listProducts,
} from '../../actions/productActions';
import { createStock } from '../../actions/stockAction';

const StockCreate = ({history}) => {
   
  const dispatch = useDispatch();

  const [product, setProduct] = useState('');
  const [size, setSize] = useState(0);
  const [color, setColor] = useState('');
  const [count, setCount] = useState(0);
  
  const [sizeList, setSizeList] = useState([]);
  

  useEffect(() => {
     dispatch(listProducts(''));
  }, [])
  

    const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  

  
  const selectProduct = (value) => {
    setProduct(value);

    let product = products.find((e) => e._id === value);
  
    setSizeList(product.stock);
  }


  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createStock({
        product,
        size,
        color,
        count,
      })
    );

    history.push('/admin/stocks');
  };

   
  return (
    <>
      {' '}
      <Link to="/admin/stocks" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Stock</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Product</Form.Label>
            <Form.Control
              as="select"
              value={product}
              onChange={(e) => selectProduct(e.target.value)}
              required={true}
            >
              <option>Select Product</option>
              {products.map((obj) => (
                <option value={obj._id} key={obj._id}>
                  {obj.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label>Size</Form.Label>
            <Form.Control
              as="select"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              required={true}
            >
              <option>Select Size</option>
              {sizeList.map((obj) => (
                <option value={obj.size} key={obj._id}>
                  {obj.size}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required={true}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="promoCode">
            <Form.Label>count</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Count"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              required={true}
            ></Form.Control>
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
}


export default StockCreate;