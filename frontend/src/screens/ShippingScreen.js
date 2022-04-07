import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [fName, setFName] = useState(shippingAddress.fName);
  const [lName, setLName] = useState(shippingAddress.lName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [apartment, setApartment] = useState(shippingAddress.apartment);
  const [city, setCity] = useState(shippingAddress.city);
  const [emirate, setEmirate] = useState(shippingAddress.emirate);
    const [phone, setPhone] = useState(shippingAddress.phone);

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      saveShippingAddress({
        fName,
        lName,
        address,
        apartment,
        city,
        emirate,
        phone,
      })
    );
    history.push('/payment')
  }

  const emirates = [
    {
      id: '1',
      name: 'Abu Dhabi',
    },
    {
      id: '2',
      name: 'Ajman',
    },
    {
      id: '3',
      name: 'Dubai',
    },
    {
      id: '4',
      name: 'Fujairah',
    },
    {
      id: "5",
      name : 'Ras al-Khaima'
      
    },
    {
      id: "6",
      name : 'Sharjah'
      
    },
    {
      id: "7",
      name : 'Umm al-Quwain'
      
    }
    
  ];

  return (
    <FormContainer >
      <CheckoutSteps step1 step2 />
      <h3>Shipping address</h3>
      <Form onSubmit={submitHandler} className='mb-3'>
        <Form.Group controlId="address">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            value={fName}
            required
            onChange={(e) => setFName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            value={lName}
            
            onChange={(e) => setLName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Apartment, suite, etc .</Form.Label>
          <Form.Control
            type="text"
            placeholder="Apartment, suite, etc . (Optional)"
            value={apartment}
             
            onChange={(e) => setApartment(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label>Emirate</Form.Label>

          <Form.Control
            as="select"
            onChange={(e) => setEmirate(e.target.value)}
            required
            value={emirate}
          >
            <option>Select Emirates</option>
            {emirates.map((obj) => (
              <option value={obj.name} key={obj.id}>
                {obj.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Phone"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
      
    </FormContainer>
  );
}

export default ShippingScreen
