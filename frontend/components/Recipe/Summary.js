import React from 'react';

function Summary() {
  return (
    <div className='summary'>
      <ul className='list-group-flush'>
        <li className='list-group-item d-flex justify-content-between align-items-center'>
          <span className='time'>Prep Time</span>
          <span className='badge badge-primary badge-pill'>10 minutes</span>
        </li>
        <li className='list-group-item d-flex justify-content-between align-items-center'>
          <span className='time'>Cook Time</span>
          <span className='badge badge-primary badge-pill'>20 minutes</span>
        </li>
        <li className='list-group-item d-flex justify-content-between align-items-center'>
          <span className='time'>Servings</span>
          <span className='badge badge-primary badge-pill'>4 to 6</span>
        </li>
      </ul>
      <p className='summary-text'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu commodo velit, vitae
        aliquam diam. Sed lobortis mauris dui, in ullamcorper neque vulputate id. Donec pharetra
        mauris vitae odio gravida, sit amet molestie ex congue. Quisque vel sodales ligula. Integer
        ullamcorper, lacus ac convallis posuere.
      </p>
    </div>
  );
}

export default Summary;
