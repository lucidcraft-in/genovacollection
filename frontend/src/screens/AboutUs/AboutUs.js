import React from 'react'
import './AboutUs.css'

const   AboutUs = () =>{
  return (
    <section className="about-background">
      {' '}
      <header>
        <h1 class="site-heading text-center text-faded d-none d-lg-block">
          <span class="site-heading-upper text-primary mb-3">About Us</span>
          <span class="site-heading-lower">FOOTWEAR & ACCESSORIES </span>
        </h1>
      </header>
      <section class="page-section clearfix">
        <div class="container">
          <div class="intro">
            <img
              class="intro-img img-fluid mb-3 mb-lg-0 rounded"
              src={`${process.env.PUBLIC_URL}/images/intro.png`}
              alt="..."
            />
            <div class="intro-text left-0 text-center bg-faded p-5 rounded">
              <h2 class="section-heading mb-4">
                <span class="section-heading-upper">FOOTWEAR</span>
                <span class="section-heading-lower">OUR FOOTWEAR</span>
              </h2>
              <p class="mb-3">
                Our footwear comprises 100% natural materials Explore exquisite
                design and authentic art. Enjoy rigid structure and an artistic
                touch. Feel the soft insole and other quality components created
                with optimal contours and perfect harmony. Italian artisans
                boasting superb craftsmanship with decades of experience have
                created footwear perfection for you, from the most luxurious
                100% natural leather, from calf, goat, deer, ostrich, snake and
                crocodile. In addition, natural cork extracted from oak and
                natural rubber have been molded with the utmost accuracy
              </p>
              <div class="intro-button mx-auto">
                <a class="btn btn-primary btn-xl" href="#!">
                  Visit Us Today!
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="page-section cta">
        <div class="container">
          <div class="row">
            <div class="col-xl-9 mx-auto">
              <div class="cta-inner bg-faded text-center rounded">
                <h2 class="section-heading mb-4">
                  <span class="section-heading-upper">Our Promise</span>
                  <span class="section-heading-lower">ABOUT</span>
                </h2>
                <p class="mb-0">
                  Established in 1982 at a time when high quality footwear
                  models were seldom available, FARES arose as the first brand
                  for authentic, traditional footwear. It was indeed a valuable
                  addition to the market as it offered a variety of collections,
                  not merely calf leather (as per the norm), but varieties that
                  also included an assortment of rich leathers in an array of
                  exquisite designs. Inspired by their global excursions,
                  renowned Italian artisans interpreted hundreds of ideas, only
                  to shortlist a discerned few. Handcrafted with the utmost
                  attention to detail, these fine designs were carefully
                  selected as if FARES’ proprietors were cherry-picking them for
                  their own personal indulgence.
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