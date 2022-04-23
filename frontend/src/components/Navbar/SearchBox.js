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
    if (e.target.value) {
      history.push(`/search/${e.target.value}`);
    } else {
      history.push('/');
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-8">
            <div className="search">
              {' '}
              <i className="fa fa-search"></i>{' '}
              <input
                type="text"
                className="form-control"
                placeholder={
                  currentLanguageCode === 'en'
                    ? t('search_product_english')
                    : t('search_product_arabic')
                }
                onChange={(e) =>submitHandler(e)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Form.Control
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
      </Button> */}
      {/* <div className="d-flex bd-highlight example-parent">
        <div className="p-2 w-100 bd-highlight col-example">
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
        </div> */}
      {/* <div className="p-2 flex-shrink-1 bd-highlight col-example">
          <Button
            type="submit"
            variant="outline-secondary"
            className={
              currentLanguageCode === 'en'
                ? 'p-2 search-icon-left'
                : 'p-2 search-icon-right'
            }
          >
            <i className="fas fa-search "></i>
          </Button>
        </div> */}
      {/* </div> */}
    </Form>
  );
}

export default SearchBox
