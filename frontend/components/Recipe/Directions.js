import React from 'react';
import Picture from '../Picture';
import toTitleCase from 'to-title-case';
import PropTypes from 'prop-types';

function Directions({ directions }) {
  const makeAltAndTitle = str => {
    const slug = str.split('/').pop().split('-').join(' ');
    return toTitleCase(slug);
  };

  return (
    <section className='directions'>
      <h2 className='mb-4'>Directions</h2>

      {directions.map((str, i) => {
        if (str.startsWith('http')) {
          const altAndTitle = makeAltAndTitle(str);
          return (
            <Picture
              key={`${i}-${str}`}
              className='img-fluid rounded w-100'
              url={str}
              width='1000'
              height='1000'
              alt={altAndTitle}
              title={altAndTitle}
              loading='lazy'
            />
          );
        } else if (str.startsWith('tada')) {
          const altAndTitle = makeAltAndTitle(str.slice(5));
          return (
            <div key={`${i}-${str}`}>
              <h2 className='mt-4 mb-4 text-center'>Tada!</h2>
              <Picture
                className='img-fluid rounded w-100 m-0'
                url={str.split(' ')[1]}
                width='1000'
                height='1000'
                alt={altAndTitle}
                title={altAndTitle}
                loading='lazy'
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
