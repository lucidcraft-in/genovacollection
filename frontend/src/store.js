import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productHomeListReducer,
  relatedProductsReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
  orderShippedReducer,
} from './reducers/orderReducers';
import {
  promotionListReducer,
  promotionDetailsReducer,
  promotionDeleteReducer,
  promotionCreateReducer,
  promotionUpdateReducer,
} from './reducers/promotionReducer';
import {
  subCategoriesListReducer,
  subCategoryDetailsReducer,
  subCategoryDeleteReducer,
  subCategoryCreateReducer,
  subCategoryUpdateReducer,
} from './reducers/subCategoryReducer';
import { categoryListReducer, categoryCreateReducer, categoryUpdateReducer,categoryDetailsReducer,categoryDeleteReducer} from './reducers/categoryReducers'


import {
  stockListReducer,
  stockCreateReducer,
  stockUpdateReducer,
  stockDetailsReducer,
  stockDeleteReducer,
  stockDetailsReducerByProduct,
} from './reducers/stockReducer';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  productHomeList: productHomeListReducer,
  relatedProducts: relatedProductsReducer,

  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderShipped: orderShippedReducer,

  promotionList: promotionListReducer,
  promotionDetails: promotionDetailsReducer,
  promotionDelete: promotionDeleteReducer,
  promotionCreate: promotionCreateReducer,
  promotionUpdate: promotionUpdateReducer,

  subCategoryList: subCategoriesListReducer,
  subCategoryDetails: subCategoryDetailsReducer,
  subCategoryDelete: subCategoryDeleteReducer,
  subCategoryCreate: subCategoryCreateReducer,
  subCategoryUpdate: subCategoryUpdateReducer,

  categoryList: categoryListReducer,
  categoryCreate: categoryCreateReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDetails: categoryDetailsReducer,
  categoryDelete: categoryDeleteReducer,

  stockList: stockListReducer,
  stockCreate: stockCreateReducer,
  stockUpdate: stockUpdateReducer,
  stockDetails: stockDetailsReducer,
  stockDelete: stockDeleteReducer,
  productStock: stockDetailsReducerByProduct,
});
 


const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
