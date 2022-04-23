import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../../components/FormContainer';
import {
  listStockDetails,
  updateStock
} from '../../../actions/stockAction';
import Sidebar from '../Sidebar';
 
import { PROMOTION_UPDATE_RESET } from '../../../constants/promotionConstant';
const StockEdit = ({ match, history }) => {
  const stockId = match.params.id;

  const [color, setColor] = useState('');
   const [count, setCount] = useState('');

  const dispatch = useDispatch();

    const stockDetails = useSelector((state) => state.stockDetails);
  const { loading, error, stock, page, pages } = stockDetails;
  
   const stockUpdate = useSelector((state) => state.stockUpdate);
   const {
     loading: loadingUpdate,
     error: errorUpdate,
     success: successUpdate,
   } = stockUpdate;

  useEffect(() => {
    if (successUpdate) {
      
      // history.push('/admin/stocks');
    } else {
       
      if (!stock.product || stock.stock._id !== stockId) {
       
        dispatch(listStockDetails(stockId));
      } else {
        
        setColor(stock.stock.color);
        setCount(stock.stock.count);
      }
    }
  }, [dispatch, history, stockId, stock, successUpdate]);

  
  
   const submitHandler = (e) => {
     e.preventDefault();
     dispatch(
       updateStock({
         _id: stockId,
         color,
         count,
          
       })
     );

      history.push('/admin/stocks');
   };


 
    
      
    
  return (
    <div>
      <Sidebar />
      <div className="main">
        <>
          {' '}
          <Link to="/admin/stocks" className="btn btn-light my-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
          </Link>
          <FormContainer>
            <h1>Update Stock</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Product</Form.Label>
                <Form.Control
                  required={true}
                  value={stock?.product?.name}
                  readOnly={true}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="name">
                <Form.Label>Size</Form.Label>
                <Form.Control
                  required={true}
                  value={stock?.stock?.size}
                  readOnly={true}
                ></Form.Control>
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
                <Form.Label>Count</Form.Label>
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
                    Update
                  </Button>
                </div>
              </div>
            </Form>
          </FormContainer>
        </>
        ;
      </div>
    </div>
  );
};

export default StockEdit;
