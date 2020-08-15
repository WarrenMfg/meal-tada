import React from 'react';
import PropTypes from 'prop-types';

function Directions({ directions }) {
  return (
    <section className='directions'>
      <h2 className='mb-4'>Directions</h2>

      {directions.map((str, i) => {
        if (str.slice(0, 4) === 'http') {
          return (
            <img
              key={`${i}-${str}`}
              className='img-fluid rounded w-100'
              src={str}
            />
          );
        } else if (str.slice(0, 4) === 'tada') {
          return (
            <div key={`${i}-${str}`}>
              <h2 className='mt-4 mb-4 text-center'>Tada!</h2>
              <img
                className='img-fluid rounded w-100 mt-0'
                src={str.split(' ')[1]}
              />
            </div>
          );
        } else {
          return (
            <p className='m-0' key={`${i}-${str}`}>
              {str}
            </p>
          );
        }
      })}
    </section>
  );
}

Directions.propTypes = {
  directions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default Directions;
