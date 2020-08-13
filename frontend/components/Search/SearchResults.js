import React, { useEffect } from 'react';
import { setSearchFeedback } from '../../actions/searchActions';
import Loading from '../Loading';
import RecipeCard from '../RecipeCard';

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

    <div className='text-center mb-5'>
      <h1>👆</h1>
      <h2>(use the form)</h2>
    </div>,

    <div className='text-center mb-5'>
      <h1>🧐</h1>
      <h2>(maybe try different criteria)</h2>
    </div>,

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

export default SearchResults;
