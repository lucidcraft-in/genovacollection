import axios from 'axios';
import {
  PROMOTION_LIST_REQUEST,
  PROMOTION_LIST_SUCCESS,
  PROMOTION_LIST_FAIL,
  PROMOTION_DETAILS_REQUEST,
  PROMOTION_DETAILS_SUCCESS,
  PROMOTION_DETAILS_FAIL,
  PROMOTION_DELETE_SUCCESS,
  PROMOTION_DELETE_REQUEST,
  PROMOTION_DELETE_FAIL,
  PROMOTION_CREATE_REQUEST,
  PROMOTION_CREATE_SUCCESS,
  PROMOTION_CREATE_FAIL,
  PROMOTION_UPDATE_REQUEST,
  PROMOTION_UPDATE_SUCCESS,
  PROMOTION_UPDATE_FAIL,
  
} from '../constants/promotionConstant';
import { logout } from './userActions';


export const listPromotions =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: PROMOTION_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/promotion?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: PROMOTION_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PROMOTION_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
        };
  

        
export const listPromotionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROMOTION_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/promotion/${id}`);

    dispatch({
      type: PROMOTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROMOTION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const deletePromotion = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROMOTION_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/promotion/${id}`, config);

    dispatch({
      type: PROMOTION_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: PROMOTION_DELETE_FAIL,
      payload: message,
    });
  }
};



export const createPromotion = (promotion) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROMOTION_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.log(config);

    const { data } = await axios.post(`/api/promotion`, promotion, config);

    console.log(data);

    dispatch({
      type: PROMOTION_CREATE_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: PROMOTION_CREATE_FAIL,
      payload: message,
    });
  }
};



export const updatePromotion = (promotion) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROMOTION_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/promotion/${promotion._id}`,
      promotion,
      config
    );

    dispatch({
      type: PROMOTION_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: PROMOTION_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: PROMOTION_UPDATE_FAIL,
      payload: message,
    });
  }
};