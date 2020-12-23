import React from 'react';
import Picture from '../Picture';
import toTitleCase from 'to-title-case';
import PropTypes from 'prop-types';
import '../styles/Directions.css';

function Directions({ directions, instagram }) {
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
              className='img-fluid rounded w-100 m-0'
              url={str}
              width='1000'
              height='1000'
              alt={altAndTitle}
              title={altAndTitle}
              loading='lazy'
            />
          );
        } else if (str.startsWith('tada')) {
          const split = str.split(' ');
          const altAndTitle = makeAltAndTitle(split[1]);
          return (
            <div key={`${i}-${str}`}>
              <h2 className='mt-4 mb-4 text-center'>Tada!</h2>
              <a
                href={`https://www.instagram.com/p/${instagram}`}
                target='_blank'
                rel='noreferrer'
                className='rounded instagram-container'
              >
                <Picture
                  className='img-fluid w-100 m-0 instagram'
                  url={split[1]}
                  width='1000'
                  height='1000'
                  alt={altAndTitle}
                  title={altAndTitle}
                  loading='lazy'
                />
              </a>
            </div>
          );
        } else {
          return (
            <p className='mt-4 mb-4' key={`${i}-${str}`}>
              {str}
            </p>
          );
        }
      })}
    </section>
  );
}

Directions.propTypes = {
  directions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  instagram: PropTypes.string.isRequired
};

export default Directions;
