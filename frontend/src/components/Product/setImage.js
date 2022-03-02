import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import Loader from '../Loader';


export default function SetImage({ imageIndex, setImagesArray, imagesArray }) {
  
  const [uploading, setUploading] = useState(false);
  const [index, setIndex] = useState(imageIndex);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

        const { data } = await axios.post('/api/upload', formData, config);
        
     updateData(data, 'url');
        
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

    const removeItem = () => {
 
      setImagesArray([
        ...imagesArray.slice(0, index),
        ...imagesArray.slice(index + 1),
      ]);
    };
    

    const updateData = (value, key) => {
    
        let newArr = [...imagesArray];
        newArr[index][key] = value;

        setImagesArray(newArr);

    }
      
  
  
    
  return (
    <div>
      {' '}
      <Form.Group controlId="image">
        <Form.Label>Image</Form.Label>
      
        <img src={imagesArray[index]['url']}  height="100"/>
        <Form.File
          id="image-file"
          label="Choose File"
          custom
          required={imagesArray[index]['url'] ? false : true}
          onChange={uploadFileHandler}
        ></Form.File>
        {uploading && <Loader />}
      </Form.Group>
      <Form.Group controlId="image">
        <Form.Label>Color</Form.Label>
        <Form.Control
          type="color"
          placeholder="Enter image url"
          value={imagesArray[index]['color']}
          onChange={(e) => updateData(e.target.value, 'color')}
        ></Form.Control>

        {uploading && <Loader />}
      </Form.Group>
      <div className="d-flex justify-content-end">
        <a onClick={removeItem}>
          <i aria-hidden="true" className="text-danger fa fa-minus-circle"></i>
        </a>
      </div>
    </div>
  );
}
