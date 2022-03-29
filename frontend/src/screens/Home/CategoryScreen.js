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
    getCategory();
  }, [categoryId, subCategory]);

 

  return (
    <>
      <Container>
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
          <ul class="list-group">
            <h5> Sub Categories</h5>
            {subCategoryList.map((sub) => (
              <li
                class="list-group-item d-flex justify-content-between align-items-center pointer"
                key={sub._id}
                onClick={(e) => setSubCategory(sub._id)}
              >
                {sub.name}
                <span class="badge badge-primary badge-pill"> {sub.count}</span>
              </li>
            ))}
            <li
              class="list-group-item d-flex justify-content-between align-items-center pointer"
              onClick={(e) => setSubCategory('')}
            >
              All
              <span class="badge badge-primary badge-pill"> </span>
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