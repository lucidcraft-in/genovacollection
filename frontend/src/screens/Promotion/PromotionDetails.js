import React, { useEffect, useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Table
} from 'react-bootstrap';

const PromotionDetails = ({ match }) => {
  const promotionId = match.params.id;


  const [data, setData] = useState()

  useEffect(() => {

    (async function () {
      try {
        const { data } = await axios.get(
          `/api/promotion/${promotionId}`);
        setData(data);
           
      } catch (e) {
        console.error(e);
      }
    })();
  
  }, []);

  

  return (
    <>
      <Link to="/admin/promotions" className="btn btn-light my-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
      </Link>
      <Tabs
        defaultActiveKey="home"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Home">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>Name:</Col>
                <Col>
                  <strong>{data?.promotion.name} </strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Phone :</Col>
                <Col>{data?.promotion.phone}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Promo Code:</Col>
                <Col>{data?.promotion.code} </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total Orders:</Col>
                <Col>{data?.orders.length}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Tab>
        <Tab eventKey="orders" title="Orders">
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>NAME</th>
                <th>Amount</th>
                <th>Number of product</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.shippingAddress.address}</td>
                  <td> {order.totalAmount}</td>
                  <td>{order.orderItems.length}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </>
  );
};


export default PromotionDetails