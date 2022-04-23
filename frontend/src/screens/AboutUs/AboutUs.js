import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import './AboutUs.css'

const AboutUs = () => {
  const { t } = useTranslation();
  
      const currentLanguageCode = cookies.get('i18next') || 'en';

  
useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
    /* you can also use 'auto' behaviour
          in place of 'smooth' */
  });
}, [])


  return (
    <section className="about-background p-0">
      {' '}
      <header>
        <h1 className="site-heading text-center text-faded d-none d-lg-block">
          <span className="site-heading-upper text-primary mb-3">
            {currentLanguageCode === 'en'
              ? t('about_us_english')
              : t('about_us')}
          </span>
          <span className="site-heading-lower">
            {' '}
            {currentLanguageCode === 'en'
              ? t('foot_acce_eng')
              : t('foot_acce_ar')}
          </span>
        </h1>
      </header>
      <section className="page-section clearfix">
        <div className="container">
          <div className="intro">
            <img
              className="intro-img img-fluid mb-3 mb-lg-0 rounded"
              src={`${process.env.PUBLIC_URL}/images/aboutus.jpg`}
              alt="..."
            />
            <div className="intro-text left-0 text-center bg-faded p-5 rounded">
              <h2 className="section-heading mb-4">
                <span className="section-heading-upper">
                  {currentLanguageCode === 'en'
                    ? t('footwear')
                    : t('footwear_ar')}
                </span>
                <span className="section-heading-lower">
                  {' '}
                  {currentLanguageCode === 'en'
                    ? t('our_footwear')
                    : t('our_footwear_ar')}
                </span>
              </h2>
              <p className="mb-3">
                {currentLanguageCode === 'en'
                  ? t('about_us_footwear_description')
                  : t('about_us_footwear_description_ar')}
              </p>
              <div className="intro-button mx-auto">
                <Link className="btn btn-primary btn-xl" to="/">
                  {currentLanguageCode === 'en'
                    ? t('visit_us')
                    : t('visit_us_ar')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="page-section cta">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 mx-auto">
              <div className="cta-inner bg-faded text-center rounded">
                <h2 className="section-heading mb-4">
                  <span className="section-heading-upper">
                    {' '}
                    {currentLanguageCode === 'en'
                      ? t('our_promise_')
                      : t('our_promise_ar')}
                  </span>
                  <span className="section-heading-lower">
                    {' '}
                    {currentLanguageCode === 'en' ? t('about') : t('about_ar')}
                  </span>
                </h2>
                <p className="mb-0">
                  {currentLanguageCode === 'en'
                    ? t('about_us')
                    : t('about_us_ar')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}


export default AboutUs