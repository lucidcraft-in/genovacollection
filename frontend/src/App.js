import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Navbar/Header';
import Footer from './components/Footer'
import HomeScreen from './screens/Home/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'

import ProductListScreen from './screens/Product/ProductListScreen'
import ProductEditScreen from './screens/Product/ProductEditScreen'
import ProductCreateScreen from './screens/Product/ProductCreate';

import StockListScreen from './screens/Stock/StockListScreen';
import StockCreate from './screens/Stock/StockCreate';
import StockEdit from './screens/Stock/StockEdit';
 

import OrderListScreen from './screens/OrderListScreen'
import CategoryCreateScreen from './screens/Category/CategoryCreate.js'
import CategoryEditScreen from './screens/Category/CategoryEditScreen';
import CategoryListScreen from './screens/Category/CategoryListScreen';

import PromotionListScreen from './screens/Promotion/PromotionListScreen';
import PromotionCreate from './screens/Promotion/PromotionCreate';
import PromotionEdit from './screens/Promotion/PromotionEdit';
import PromotionDetails from './screens/Promotion/PromotionDetails';

import SubCategoryList from './screens/SubCategory/SubCategoryList';
import SubCategoryCreate from './screens/SubCategory/SubCategoryCreate';
import SubCategoryEdit from './screens/SubCategory/SubCategoryEdit';


const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route
            path="/admin/productlist"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/productlist/:pageNumber"
            component={ProductListScreen}
            exact
          />
          <Route path="/admin/product/edit/:id" component={ProductEditScreen} />
          <Route path="/admin/product/create" component={ProductCreateScreen} />
          <Route path="/admin/stocks" component={StockListScreen} />
          <Route path="/admin/stock/create" component={StockCreate} />
          <Route path="/admin/stock/edit/:id" component={StockEdit} />

          <Route path="/admin/orderlist" component={OrderListScreen} />
          <Route path="/admin/promotions" component={PromotionListScreen} />
          <Route path="/admin/promotion/create" component={PromotionCreate} />
          <Route path="/admin/promotion/:id/edit" component={PromotionEdit} />
          <Route path="/admin/promotion/:id" component={PromotionDetails} />
          <Route path="/admin/subcategories" component={SubCategoryList} />
          <Route
            path="/admin/subcategory/create"
            component={SubCategoryCreate}
          />
          <Route
            path="/admin/subcategory/:id/edit"
            component={SubCategoryEdit}
          />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route
            path="/admin/category/create"
            component={CategoryCreateScreen}
          />
          <Route
            path="/admin/categorylist"
            component={CategoryListScreen}
            exact
          />
          <Route
            path="/admin/category/:id/edit"
            component={CategoryEditScreen}
          />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
            exact
          />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App
