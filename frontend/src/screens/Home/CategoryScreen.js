import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap';
import Product from '../../components/Home/Product';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const CategoryScreen = ({ match, history }) => {
  const categoryId = match.params.id;

  const [products, setProduct] = useState([])
   const [subCategoryList, setSubCategoryList] = useState([]);
  const [subCategory, setSubCategory] = useState('');
  const [categoryName, setCategoryName] = useState('');
  
  const getCategory = async () => {
    let obj = {
      category: categoryId,
      subcategory: subCategory,
    };

    const { data } = await axios.post('/api/categories/home', obj);
     
    setProduct(data.products);
    setSubCategoryList(data.subCategory);
    setCategoryName(data.categoryName);
}

 
  
  useEffect(() => {

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
    /* you can also use 'auto' behaviour
          in place of 'smooth' */
  });

    getCategory();
  }, [categoryId, subCategory]);

 

  return (
    <>
      <Container className='pt-2'>
        <Row>
          <Col sm={8}> </Col>
          <Col sm={4}>
            {' '}
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>

              <Breadcrumb.Item active>{categoryName}</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <ul className="list-group category-border">
            <span className="vertical-filters-header "> Sub Categories</span>
            {subCategoryList.map((sub) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center pointer"
                key={sub._id}
                onClick={(e) => setSubCategory(sub._id)}
              >
                {sub.name}
                <span className="badge badge-primary badge-pill"> {sub.count}</span>
              </li>
            ))}
            <li
              className="list-group-item d-flex justify-content-between align-items-center pointer"
              onClick={(e) => setSubCategory('')}
            >
              All
              <span className="badge badge-primary badge-pill"> </span>
            </li>
          </ul>
          {products.map((item) => (
            <Col sm={3} key={item._id}>
              <Product product={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};


export default CategoryScreen