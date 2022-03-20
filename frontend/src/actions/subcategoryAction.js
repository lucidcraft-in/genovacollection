import axios from 'axios';
import {
  SUB_CATEGORY_LIST_REQUEST,
  SUB_CATEGORY_LIST_SUCCESS,
  SUB_CATEGORY_LIST_FAIL,
  SUB_CATEGORY_DETAILS_REQUEST,
  SUB_CATEGORY_DETAILS_SUCCESS,
  SUB_CATEGORY_DETAILS_FAIL,
  SUB_CATEGORY_DELETE_SUCCESS,
  SUB_CATEGORY_DELETE_REQUEST,
  SUB_CATEGORY_DELETE_FAIL,
  SUB_CATEGORY_CREATE_REQUEST,
  SUB_CATEGORY_CREATE_SUCCESS,
  SUB_CATEGORY_CREATE_FAIL,
  SUB_CATEGORY_UPDATE_REQUEST,
  SUB_CATEGORY_UPDATE_SUCCESS,
  SUB_CATEGORY_UPDATE_FAIL,
} from '../constants/subCategoryConstant';
import { logout } from './userActions';

export const listSubCategories =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: SUB_CATEGORY_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/subcategory?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: SUB_CATEGORY_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SUB_CATEGORY_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listSubCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SUB_CATEGORY_DETAILS_REQUEST });
     
    const { data } = await axios.get(`/api/subcategory/${id}`);

    dispatch({
      type: SUB_CATEGORY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUB_CATEGORY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSubCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUB_CATEGORY_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/subcategory/${id}`, config);

    dispatch({
      type: SUB_CATEGORY_DELETE_SUCCESS,
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
      type: SUB_CATEGORY_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createSubCategory = (promotion) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUB_CATEGORY_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

   

    const { data } = await axios.post(`/api/subcategory`, promotion, config);

    console.log(data);

    dispatch({
      type: SUB_CATEGORY_CREATE_SUCCESS,
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
      type: SUB_CATEGORY_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateSubCategory = (subCategory) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUB_CATEGORY_UPDATE_REQUEST,
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
      `/api/subcategory/${subCategory._id}`,
      subCategory,
      config
    );

    dispatch({
      type: SUB_CATEGORY_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: SUB_CATEGORY_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: SUB_CATEGORY_UPDATE_FAIL,
      payload: message,
    });
  }
};
