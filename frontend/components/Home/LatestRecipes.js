import React from 'react';
import RecipeCard from '../RecipeCard'

function LatestRecipes() {
  return (
    <>
      <h1 className='mt-5 mb-5 text-center'>Latest Recipes</h1>

      <main className='mb-2'>
        <RecipeCard />
      </main>
    </>
  );
};

export default LatestRecipes;
