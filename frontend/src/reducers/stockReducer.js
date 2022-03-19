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
  STOCK_CREATE_RESET,
  STOCK_CREATE_REQUEST,
  STOCK_CREATE_SUCCESS,
  STOCK_CREATE_FAIL,
  STOCK_UPDATE_REQUEST,
  STOCK_UPDATE_SUCCESS,
  STOCK_UPDATE_FAIL,
  STOCK_UPDATE_RESET,
  STOCK_DETAILS_BY_PRODUCT_REQUEST,
  STOCK_DETAILS_BY_PRODUCT_SUCCESS,
  STOCK_DETAILS_BY_PRODUCT_FAIL,
} from '../constants/stockConstant';



export const stockListReducer = (state = { stocks: [] }, action) => {
  switch (action.type) {
    case STOCK_LIST_REQUEST:
      return { loading: true, stocks: [] };
    case STOCK_LIST_SUCCESS:
      return {
        loading: false,
        stocks: action.payload.stocks,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case STOCK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};




export const stockDetailsReducer = (state = { stock: {} }, action) => {
  switch (action.type) {
    case STOCK_DETAILS_REQUEST:
      return { ...state, loading: true };
    case STOCK_DETAILS_SUCCESS:
      return { loading: false, stock: action.payload };
    case STOCK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const stockDetailsReducerByProduct = (state = { stock: {} }, action) => {
  switch (action.type) {
    case STOCK_DETAILS_BY_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case STOCK_DETAILS_BY_PRODUCT_SUCCESS:
      return { loading: false, stock: action.payload };
    case STOCK_DETAILS_BY_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};



export const stockDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_DELETE_REQUEST:
      return { loading: true };
    case STOCK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case STOCK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_CREATE_REQUEST:
      return { loading: true };
    case STOCK_CREATE_SUCCESS:
      return { loading: false, success: true, stock: action.payload };
    case STOCK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case STOCK_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const stockUpdateReducer = (state = { stock: {} }, action) => {
  switch (action.type) {
    case STOCK_UPDATE_REQUEST:
      return { loading: true };
    case STOCK_UPDATE_SUCCESS:
      return { loading: false, success: true, stock: action.payload };
    case STOCK_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case STOCK_UPDATE_RESET:
      return { stock: {} };
    default:
      return state;
  }
};