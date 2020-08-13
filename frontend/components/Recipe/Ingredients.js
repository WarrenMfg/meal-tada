import React from 'react';
import PropTypes from 'prop-types';

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

Ingredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default Ingredients;
