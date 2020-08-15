import React from 'react';
import toTitleCase from 'to-title-case';
import PropTypes from 'prop-types';

function Directions({ directions }) {
  const makeAltAndTitle = str => {
    const slug = str.split('/').pop().slice(0, -4).split('-').join(' ');
    return toTitleCase(slug);
  };

  return (
    <section className='directions'>
      <h2 className='mb-4'>Directions</h2>

      {directions.map((str, i) => {
        if (str.startsWith('http')) {
          const altAndTitle = makeAltAndTitle(str);
          return (
            <img
              key={`${i}-${str}`}
              className='img-fluid rounded w-100'
              src={str}
              alt={altAndTitle}
              title={altAndTitle}
            />
          );
        } else if (str.startsWith('tada')) {
          const altAndTitle = makeAltAndTitle(str.slice(5));
          return (
            <div key={`${i}-${str}`}>
              <h2 className='mt-4 mb-4 text-center'>Tada!</h2>
              <img
                className='img-fluid rounded w-100 mt-0'
                src={str.split(' ')[1]}
                alt={altAndTitle}
                title={altAndTitle}
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
