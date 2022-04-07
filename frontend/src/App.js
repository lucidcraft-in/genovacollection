import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import cookies from 'js-cookie';
import classNames from 'classnames';
import { Container } from 'react-bootstrap'
import Header from './components/Navbar/Header';
import Footer from './components/Footer'
import WhatsApp from './components/Home/WhatsApp';
 import PreLoader from './components/Home/PreLoader';

 import ScrollButton from './components/ScrollButton/ScrollButton';

import HomeScreen from './screens/Home/HomeScreen'


import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import CategoryScreen from './screens/Home/CategoryScreen';


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

import AboutUs from './screens/AboutUs/AboutUs';





const languages = [
  
  {
    code: 'en',
    name: 'English',
    country_code: 'gb',
  },
  {
    code: 'ar',
    name: 'العربية',
    dir: 'rtl',
    country_code: 'sa',
  },
];

const GlobeIcon = ({ width = 24, height = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="currentColor"
    className="bi bi-globe"
    viewBox="0 0 16 16"
  >
    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
  </svg>
);

const App = () => {

    const currentLanguageCode = cookies.get('i18next') || 'en';
    const currentLanguage = languages.find(
      (l) => l.code === currentLanguageCode
    );
    const { t } = useTranslation();

   
  
  const [preLoad, setPreload] = useState(true);

    useEffect(() => {
      
      document.body.dir = currentLanguage.dir || 'ltr';
      document.title = t('app_title');
    }, [currentLanguage, t]);

  setTimeout(() => {
    setPreload(false);
  }, 4000);
  
  return (
    <Router>
      {preLoad === true ? (
        <PreLoader />
      ) : (
        <>
          <Header />

          {/* <main className="py-3"> */}
          <main  >
            <Container>
              <Route path="/order/:id" component={OrderScreen} />
              <Route path="/shipping" component={ShippingScreen} />
              <Route path="/payment" component={PaymentScreen} />
              <Route path="/placeorder" component={PlaceOrderScreen} />
              <Route path="/login" component={LoginScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/profile" component={ProfileScreen} />
              <Route path="/product/:id" component={ProductScreen} />
              <Route path="/cart" component={CartScreen} />
              <Route path="/category/:id" component={CategoryScreen} />
              <Route path="/about" component={AboutUs} />
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
              <Route
                path="/admin/product/edit/:id"
                component={ProductEditScreen}
              />
              <Route
                path="/admin/product/create"
                component={ProductCreateScreen}
              />
              <Route path="/admin/stocks" component={StockListScreen} />
              <Route path="/admin/stock/create" component={StockCreate} />
              <Route path="/admin/stock/edit/:id" component={StockEdit} />

              <Route path="/admin/orderlist" component={OrderListScreen} />
              <Route path="/admin/promotions" component={PromotionListScreen} />
              <Route
                path="/admin/promotion/create"
                component={PromotionCreate}
              />
              <Route
                path="/admin/promotion/edit/:id"
                component={PromotionEdit}
              />
              <Route
                path="/admin/promotion/details/:id"
                component={PromotionDetails}
              />
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
          <ScrollButton />
          <WhatsApp />
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App
