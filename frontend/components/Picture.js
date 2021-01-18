import React from 'react';
import PropTypes from 'prop-types';

function Picture({ className, url, width, height, alt, title, loading }) {
  return (
    <picture>
      <source srcSet={`${url}.webp`} type='image/webp' />
      <img
        className={className}
        src={`${url}.jpg`}
        width={width}
        height={height}
        alt={alt}
        title={title}
        loading={loading}
      />
    </picture>
  );
}

Picture.propTypes = {
  className: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  loading: PropTypes.string.isRequired
};

export default Picture;
