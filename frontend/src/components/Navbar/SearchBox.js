import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';

const SearchBox = ({ history }) => {

  const { t } = useTranslation();

    const currentLanguageCode = cookies.get('i18next') || 'en';
  
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={
          currentLanguageCode === 'en'
            ? t('search_product_english')
            : t('search_product_arabic')
        }
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-secondary" className="p-2">
        <i className="fas fa-search"></i>
      </Button>
    </Form>
  );
}

export default SearchBox
