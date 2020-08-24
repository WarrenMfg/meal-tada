import React from 'react';
import PropTypes from 'prop-types';

function Ingredients({ ingredients }) {
  // make tuples
  const tuples = [];
  let tuple = [];
  ingredients.forEach((str, i) => {
    if (i % 2 === 0) {
      tuple.push(str);
    } else {
      tuple.push(str);
      tuples.push(tuple);
      tuple = [];
    }
  });

  return (
    <ul className='ingredients list-group-flush mb-0'>
      {tuples.map(tuple => {
        return (
          <li
            key={tuple[0]}
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

Ingredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default Ingredients;
