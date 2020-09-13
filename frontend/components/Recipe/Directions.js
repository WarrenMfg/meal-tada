import React, { useRef, useEffect } from 'react';
import Picture from '../Picture';
import toTitleCase from 'to-title-case';
import Instagram from 'react-instagram-embed';
import PropTypes from 'prop-types';

function Directions({ directions, instagram }) {
  const instagramContainer = useRef(null);
  useEffect(() => {
    const intervalID = setInterval(() => {
      if (
        instagramContainer.current?.firstElementChild?.firstElementChild
          ?.tagName === 'IFRAME'
      ) {
        instagramContainer.current.firstElementChild.firstElementChild.style =
          'background: white; max-width: 1000px; box-shadow: none; width: 100%; border-radius: 4px; border: 1px solid rgb(219, 219, 219); display: block; margin: 0 auto; padding: 0px;';
        clearInterval(intervalID);
      }
    }, 100);
    return () => clearInterval(intervalID);
  }, []);

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
          // const altAndTitle = makeAltAndTitle(str.slice(5));
          return (
            <div key={`${i}-${str}`}>
              {/* <h2 className='mt-4 mb-4 text-center'>Tada!</h2>
              <Picture
                className='img-fluid rounded w-100 m-0'
                url={str.split(' ')[1]}
                width='1000'
                height='1000'
                alt={altAndTitle}
                title={altAndTitle}
                loading='lazy'
              /> */}
              <h2 className='mt-4 mb-4 text-center'>Tada!</h2>
              <div className='instagram-container' ref={instagramContainer}>
                <Instagram url={`https://www.instagram.com/p/${instagram}`} />
              </div>
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
