import React, { useEffect } from 'react';
import { fetchImageScramble } from '../../api/fetch';
import { clearImageScrambleURLs } from '../../actions/generalActions';
import withGlobalStore from '../../store/withGlobalStore';

import PropTypes from 'prop-types';

import '../styles/ImageScramble.css';

function ImageScramble({ state }) {
  const {
    general: { topFives, imageScrambleURLs },
    dispatch
  } = state;

  // add while loop to mitigate landing on random recipe that is same as currentRecipe

  // get random recipe for image scramble
  const randomTopic = Math.floor(Math.random() * topFives.length);
  const randomRecipe = Math.floor(
    Math.random() * topFives[randomTopic].recipes.length
  );
  const recipe = topFives[randomTopic].recipes[randomRecipe];

  useEffect(() => {
    dispatch(fetchImageScramble, recipe.slug);
    () => dispatch(clearImageScrambleURLs());
  }, []);

  // if exists, render
  // else, make api request
  // meanwhile, blur recipe.cardAndHeroImage to indicate loading

  return <div className='image-scramble'>{imageScrambleURLs.join(' ')}</div>;
}

ImageScramble.propTypes = {
  state: PropTypes.object.isRequired
};

export default withGlobalStore(ImageScramble);
