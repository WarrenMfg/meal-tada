import React, { useEffect } from 'react';
import { setSearchFeedback } from '../../actions/searchActions';
import Loading from '../Loading';
import RecipeCard from '../RecipeCard';
import PropTypes from 'prop-types';

function SearchResults({
  isSearching,
  searchResults,
  searchFeedback,
  dispatch
}) {
  useEffect(() => {
    if (!searchResults.length) {
      dispatch(setSearchFeedback(1));
    }
  }, []);

  const searchFeedbackOptions = [
    null,

    // eslint-disable-next-line react/jsx-key
    <div className='text-center mb-5'>
      <h1>👆</h1>
      <h2>(use the form)</h2>
    </div>,

    // eslint-disable-next-line react/jsx-key
    <div className='text-center mb-5'>
      <h1>🧐</h1>
      <h2>(maybe try different criteria)</h2>
    </div>,

    // eslint-disable-next-line react/jsx-key
    <div className='text-center mb-5'>
      <h1>🤓</h1>
      <h2>(that cleared things up)</h2>
    </div>
  ];

  return (
    <main className='mt-5 mb-2'>
      {isSearching && <Loading />}

      {!!searchResults.length &&
        searchResults.map(recipe => (
          <RecipeCard key={recipe._id} recipe={recipe} dispatch={dispatch} />
        ))}

      {searchFeedbackOptions[searchFeedback]}
    </main>
  );
}

SearchResults.propTypes = {
  isSearching: PropTypes.bool.isRequired,
  searchResults: PropTypes.array.isRequired,
  searchFeedback: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default SearchResults;
