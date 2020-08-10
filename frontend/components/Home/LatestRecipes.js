import React from 'react';
import RecipeCard from '../RecipeCard'

function LatestRecipes({latestRecipes}) {
  return (
    <>
      <h1 className='mt-5 mb-5 text-center'>Latest Recipes</h1>

      <main className='mb-2'>
        {latestRecipes.map(recipe => <RecipeCard key={recipe._id} recipe={recipe} />)}

      </main>
    </>
  );
};

export default LatestRecipes;
