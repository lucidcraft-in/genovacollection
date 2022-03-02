import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer class="page-footer font-small blue-grey lighten-5">
      <div style={{ backgroundColor: '#6c7874' }} className="bg-danger">
        <div class="container">
          <div class="row py-4 d-flex align-items-center">
            <div class="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
              <h6 class="mb-0">Get connected with us on social networks!</h6>
            </div>

            <div class="col-md-6 col-lg-7 text-center text-md-right">
              <a class="fb-ic">
                <i class="fab fa-facebook-f white-text mr-4"> </i>
              </a>

              <a class="tw-ic">
                <i class="fab fa-twitter white-text mr-4"> </i>
              </a>

              <a class="gplus-ic">
                <i class="fab fa-google-plus-g white-text mr-4"> </i>
              </a>

              <a class="li-ic">
                <i class="fab fa-linkedin-in white-text mr-4"> </i>
              </a>

              <a class="ins-ic">
                <i class="fab fa-instagram white-text"> </i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="container text-center text-md-left mt-5">
        <div class="row mt-3 dark-grey-text">
          <div class="col-md-3 col-lg-4 col-xl-3 mb-4">
            <h6 class="text-uppercase font-weight-bold">GENOVA COLLECTION</h6>
            <hr
              class="teal accent-3 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: '60px;' }}
            />
            <p>
              Ecommerce is the buying and selling of goods and services over the
              Internet. It is conducted over computers, tablets, smartphones,
              and other smart devices. Almost anything can be purchased through
              ecommerce today. It can be a substitute for brick-and-mortar
              stores, though some businesses choose to maintain both.
            </p>
          </div>

          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase font-weight-bold">Products</h6>
            <hr
              class="teal accent-3 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: '60px;' }}
            />
            <p>
              <a class="dark-grey-text" href="#!">
                SANDALS
              </a>
            </p>
            <p>
              <a class="dark-grey-text" href="#!">
                CHAPPELS
              </a>
            </p>
            <p>
              <a class="dark-grey-text" href="#!">
                SHOES
              </a>
            </p>
            <p>
              <a class="dark-grey-text" href="#!">
                BABY
              </a>
            </p>
          </div>

          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase font-weight-bold">Useful links</h6>
            <hr
              class="teal accent-3 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: '60px' }}
            />
            <p>
              <a class="dark-grey-text" href="#!">
                Your Account
              </a>
            </p>
            <p>
              <a class="dark-grey-text" href="#!">
                Become an Affiliate
              </a>
            </p>
            <p>
              <a class="dark-grey-text" href="#!">
                Shipping Rates
              </a>
            </p>
            <p>
              <a class="dark-grey-text" href="#!">
                Help
              </a>
            </p>
          </div>

          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 class="text-uppercase font-weight-bold">Contact</h6>
            <hr
              class="teal accent-3 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: '60px;' }}
            />
            <p>
              <i class="fas fa-home mr-3"></i> Dubai
            </p>
            <p>
              <i class="fas fa-envelope mr-3"></i> genova@gmail.com
            </p>
            <p>
              <i class="fas fa-phone mr-3"></i> + 56852268
            </p>
            <p>
              <i class="fas fa-print mr-3"></i> + 01 586225
            </p>
          </div>
        </div>
      </div>

      <div class="footer-copyright text-center text-black-50 py-3">
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
