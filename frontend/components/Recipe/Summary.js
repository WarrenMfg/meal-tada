import React from 'react';

function Summary({ time, summary }) {
  const { prep, cook, servings } = time;
  const servingsStr = servings.length > 1 ? `${servings[0]} to ${servings[1]}` : servings;

  return (
    <div className='summary'>
      <ul className='list-group-flush'>
        <li className='list-group-item d-flex justify-content-between align-items-center'>
          <span className='time'>Prep Time</span>
          <span className='badge badge-primary badge-pill'>{prep} minutes</span>
        </li>
        <li className='list-group-item d-flex justify-content-between align-items-center'>
          <span className='time'>Cook Time</span>
          <span className='badge badge-primary badge-pill'>{cook} minutes</span>
        </li>
        <li className='list-group-item d-flex justify-content-between align-items-center'>
          <span className='time'>Servings</span>
          <span className='badge badge-primary badge-pill'>{servingsStr}</span>
        </li>
      </ul>
      <p className='summary-text'>{summary}</p>
    </div>
  );
}

export default Summary;
