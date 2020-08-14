import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

function Meta({ title, description, image }) {
  return (
    <Helmet>
      <meta property='og:title' content={title} />
      <meta property='og:type' content='website' />
      <meta property='og:image' content={image} />
      <meta property='og:description' content={description} />
      <meta name='description' content={description} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:image' content={image} />
      <meta name='twitter:description' content={description} />
    </Helmet>
  );
}

Meta.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default Meta;
