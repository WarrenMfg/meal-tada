import React from 'react';

function Ingredients({ ingredients }) {
  const tuples = ingredients.map(obj => Object.entries(obj)[0]);

  return (
    <ul className='ingredients list-group-flush mb-0'>
      {tuples.map(tuple => {
        return (
          <li
            key={tuple}
            className='list-group-item d-flex justify-content-between align-items-center'
          >
            <span className='mr-3'>{tuple[0]}</span>
            <span className='badge badge-primary badge-pill'>{tuple[1]}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default Ingredients;
