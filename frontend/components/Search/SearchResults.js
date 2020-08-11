import React from 'react';
import IsSearching from './IsSearching';
import RecipeCard from '../RecipeCard';

function SearchResults({ isSearching, searchResults, dispatch }) {
  return (
    <main className='mb-2'>
      {isSearching && <IsSearching />}
      {searchResults.map(recipe => (
        <RecipeCard key={recipe._id} recipe={recipe} dispatch={dispatch} />
      ))}
    </main>
  );
}

export default SearchResults;
