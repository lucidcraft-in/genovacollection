import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { PROMOTION_UPDATE_RESET } from '../../constants/promotionConstant';
import {
  listPromotionDetails,
  updatePromotion,
} from '../../actions/promotionAction';


const PromotionEdit = ({ match, history }) => {
  const promotionId = match.params.id;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeAvailable, setPromoCodeAvailable] = useState('');

  const dispatch = useDispatch();

  const promotionDetails = useSelector((state) => state.promotionDetails);
  const { loading, error, promotion } = promotionDetails;

  const promotionUpdate = useSelector((state) => state.promotionUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = promotionUpdate;

  console.log(promotion);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PROMOTION_UPDATE_RESET });
      history.push('/admin/promotions');
    } else {
      if (!promotion.name || promotion._id !== promotionId) {
        dispatch(listPromotionDetails(promotionId));
      } else {
       
        setName(promotion.name);
        setPhone(promotion.phone);
        setPromoCode(promotion.code);
       
      }
    }
  }, [dispatch, history, promotionId, promotion, successUpdate]);

  const submitHandler = (e) => {
     e.preventDefault();
     dispatch(
       updatePromotion({
         _id: promotionId,
         name,
         phone,
         promoCode,
        
       })
     );
  };

  const checkPromoCode = async (val) => {
    const userInfo = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : [];

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    setPromoCode(val);

    const { data } = await axios.post(`/api/promotion/${val}`, '', config);

    setPromoCodeAvailable(data.availability);
  };

  return (
    <>
      <Link to="/admin/promotions" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Update Promotion</h1>
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

          <Form.Group controlId="phone">
            <Form.Label>phone</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required={true}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="promoCode">
            <Form.Label>Promo Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Promo code"
              value={promoCode}
              onChange={(e) => checkPromoCode(e.target.value)}
              required={true}
            ></Form.Control>
          </Form.Group>
          {promoCodeAvailable === false ? (
            <div style={{ color: 'red' }}> Promo code not available</div>
          ) : (
            ''
          )}
          <div className="d-flex bd-highlight mb-3">
            <div className="mr-auto p-2 bd-highlight">
              {' '}
              <Button
                type="submit"
                variant="primary"
                className="mt-3"
                disabled={promoCodeAvailable === false ? true : false}
              >
                Update
              </Button>
            </div>
          </div>
        </Form>
      </FormContainer>
    </>
  );
};


export default PromotionEdit;