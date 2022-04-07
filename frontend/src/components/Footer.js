import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';

const Footer = () => {
  const { t } = useTranslation();
  
  const currentLanguageCode = cookies.get('i18next') || 'en';

  return (
    <footer className="page-footer font-small blue-grey lighten-5 ">
      <div style={{ backgroundColor: '#3b283f' }}>
        <div className="container">
          <div className="row py-4 d-flex align-items-center">
            <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
              <h6 className="mb-0 footer-font">
                {currentLanguageCode === 'en'
                  ? t('connect_with')
                  : t('connect_with')}
              </h6>
            </div>

            <div className="col-md-6 col-lg-7 text-center text-md-right">
              <a className="fb-ic">
                <i className="fab fa-facebook-f white-text mr-4 footer-font">
                  {' '}
                </i>
              </a>

              <a className="tw-ic">
                <i className="fab fa-twitter white-text mr-4 footer-font"> </i>
              </a>

              <a className="gplus-ic">
                <i className="fab fa-google-plus-g white-text mr-4 footer-font">
                  {' '}
                </i>
              </a>

              <a className="li-ic">
                <i className="fab fa-linkedin-in white-text mr-4 footer-font">
                  {' '}
                </i>
              </a>

              <a className="ins-ic">
                <i className="fab fa-instagram white-text footer-font"> </i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container text-center text-md-left mt-5">
        <div className="row mt-3 dark-grey-text">
          <div className="col-md-3 col-lg-4 col-xl-3 mb-4">
            <h6 className="text-uppercase font-weight-bold">
              {' '}
              {currentLanguageCode === 'en'
                ? t('genova_collection')
                : t('genova_collection')}
            </h6>
            <hr
              className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: '60px;' }}
            />
            <p>
              {currentLanguageCode === 'en'
                ? t('footer_desc')
                : t('foot_desc_ar')}
            </p>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase font-weight-bold">
              {' '}
              {currentLanguageCode === 'en' ? t('products') : t('products')}
            </h6>
            <hr
              className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: '60px;' }}
            />
            <p>
              <a className="dark-grey-text" href="#!">
                SANDALS
              </a>
            </p>
            <p>
              <a className="dark-grey-text" href="#!">
                CHAPPELS
              </a>
            </p>
            <p>
              <a className="dark-grey-text" href="#!">
                SHOES
              </a>
            </p>
            <p>
              <a className="dark-grey-text" href="#!">
                BABY
              </a>
            </p>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase font-weight-bold">
              {' '}
              {currentLanguageCode === 'en'
                ? t('usefull_link')
                : t('usefull_link')}
            </h6>
            <hr
              className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: '60px' }}
            />
            <p>
              <a className="dark-grey-text" href="#!">
                Your Account
              </a>
            </p>
            <p>
              <a className="dark-grey-text" href="#!">
                Become an Affiliate
              </a>
            </p>
            <p>
              <a className="dark-grey-text" href="#!">
                Shipping Rates
              </a>
            </p>
            <p>
              <a className="dark-grey-text" href="#!">
                Help
              </a>
            </p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase font-weight-bold">
              {' '}
              {currentLanguageCode === 'en' ? t('contact') : t('contact')}
            </h6>
            <hr
              className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: '60px;' }}
            />
            <p>
              <i className="fas fa-home mr-3"></i> Dubai
            </p>
            <p>
              <i className="fas fa-envelope mr-3"></i> genova@gmail.com
            </p>
            <p>
              <i className="fas fa-phone mr-3"></i> + 56852268
            </p>
            <p>
              <i className="fas fa-print mr-3"></i> + 01 586225
            </p>
          </div>
        </div>
      </div>

      <div className="footer-copyright text-center text-black-50 py-3">
        © 2022 Powered by:
        <a class="dark-grey-text" href="https://lucidcraft.in/" target="_blank">
          {' '}
          lucidcraft.in
        </a>
      </div>
    </footer>
  );
}

export default Footer
