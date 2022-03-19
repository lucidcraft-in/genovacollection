import axios from 'axios';
import {
  STOCK_LIST_REQUEST,
  STOCK_LIST_SUCCESS,
  STOCK_LIST_FAIL,
  STOCK_DETAILS_REQUEST,
  STOCK_DETAILS_SUCCESS,
  STOCK_DETAILS_FAIL,
  STOCK_DELETE_SUCCESS,
  STOCK_DELETE_REQUEST,
  STOCK_DELETE_FAIL,
  STOCK_CREATE_REQUEST,
  STOCK_CREATE_SUCCESS,
  STOCK_CREATE_FAIL,
  STOCK_UPDATE_REQUEST,
  STOCK_UPDATE_SUCCESS,
  STOCK_UPDATE_FAIL,
  STOCK_DETAILS_BY_PRODUCT_REQUEST,
  STOCK_DETAILS_BY_PRODUCT_SUCCESS,
  STOCK_DETAILS_BY_PRODUCT_FAIL,
} from '../constants/stockConstant';
 import { logout } from './userActions';

export const listStock =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: STOCK_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/stock?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: STOCK_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: STOCK_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
        };
  

        
        
export const listStockDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: STOCK_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/stock/${id}`);

    dispatch({
      type: STOCK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listStockDetailsByProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: STOCK_DETAILS_BY_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/stock/product/${id}`);

    dispatch({
      type: STOCK_DETAILS_BY_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_DETAILS_BY_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};




export const deleteStock = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STOCK_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/stock/${id}`, config);

    dispatch({
      type: STOCK_DELETE_SUCCESS,
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
      type: STOCK_DELETE_FAIL,
      payload: message,
    });
  }
};




export const createStock = (stock) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STOCK_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/stock`, stock, config);

    dispatch({
      type: STOCK_CREATE_SUCCESS,
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
      type: STOCK_CREATE_FAIL,
      payload: message,
    });
  }
};




export const updateStock = (stock) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STOCK_UPDATE_REQUEST,
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
      `/api/stock/${stock._id}`,
      stock,
      config
    );

    dispatch({
      type: STOCK_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: STOCK_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: STOCK_UPDATE_FAIL,
      payload: message,
    });
  }
};