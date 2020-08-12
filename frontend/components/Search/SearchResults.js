import React from 'react';
import Loading from '../Loading';
import RecipeCard from '../RecipeCard';

function SearchResults({ isSearching, searchResults, searchFeedback, dispatch }) {
  const searchFeedbackOptions = [
    null,

    <div className='text-center'>
      <h1>👆</h1>
      <h2>(use the form)</h2>
    </div>,

    <div className='text-center'>
      <h1>🧐</h1>
      <h2>(maybe try different criteria)</h2>
    </div>
  ];

  return (
    <main className='mt-3 mb-2'>
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
