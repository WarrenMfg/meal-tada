import React from 'react';

function Ingredients() {
  return (
    <section className='mb-5'>
      <h2 className='mb-4'>Ingredients</h2>
      <div className='d-flex justify-content-between'>
        <ul className='list-group-flush mb-0'>
          <li className='list-group-item d-flex justify-content-between align-items-center'>
            <span>This is some text</span>
            <span className='badge badge-primary badge-pill'>2 Tbsp</span>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-center'>
            <span>This is some text</span>
            <span className='badge badge-primary badge-pill'>2 Tbsp</span>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-center'>
            <span>This is some text</span>
            <span className='badge badge-primary badge-pill'>2 Tbsp</span>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-center'>
            <span>This is some text</span>
            <span className='badge badge-primary badge-pill'>2 Tbsp</span>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-center'>
            <span>This is some text</span>
            <span className='badge badge-primary badge-pill'>2 Tbsp</span>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-center'>
            <span>This is some text</span>
            <span className='badge badge-primary badge-pill'>2 Tbsp</span>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-center'>
            <span>This is some text</span>
            <span className='badge badge-primary badge-pill'>2 Tbsp</span>
          </li>
        </ul>
        <div className='summary'>
          <ul className='list-group-flush mb-0'>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
              <span className='time'>Prep Time</span>
              <span className='badge badge-primary badge-pill'>10 minutes</span>
            </li>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
              <span className='time'>Cook Time</span>
              <span className='badge badge-primary badge-pill'>20 minutes</span>
            </li>
          </ul>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu commodo velit,
            vitae aliquam diam. Sed lobortis mauris dui, in ullamcorper neque vulputate id. Donec
            pharetra mauris vitae odio gravida, sit amet molestie ex congue. Quisque vel sodales
            ligula. Integer ullamcorper, lacus ac convallis posuere.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Ingredients;
