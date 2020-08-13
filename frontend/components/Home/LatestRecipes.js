import React from 'react';
import RecipeCard from '../RecipeCard';
import PropTypes from 'prop-types';

function LatestRecipes({ recipes, dispatch }) {
  const latestRecipes = recipes.slice(0, 5);

  return (
    <>
      <h1 className='mt-5 mb-5 text-center'>Latest Recipes</h1>

      <main className='mb-2'>
        {latestRecipes.map(recipe => (
          <RecipeCard key={recipe._id} recipe={recipe} dispatch={dispatch} />
        ))}
      </main>
    </>
  );
}

LatestRecipes.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default React.memo(LatestRecipes, (prevProps, nextProps) => {
  if (prevProps.recipes === nextProps.recipes) {
    return true;
  } else {
    return false;
  }
});
