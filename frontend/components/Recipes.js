import React from 'react';
import RecipeCard from './RecipeCard';
import Aside from './Aside';
import hero from '../images/seasoned-edamame.jpg';
import withGlobalStore from '../store/withGlobalStore';
import './styles/Recipes.css';

function Recipes({ state }) {
  const { dispatch } = state;
  const { recipes } = state.recipes;
  const { topFives } = state.general;

  return (
    <div className='container recipes'>
      <div className='row'>
        <div className='col'>
          <div className='rounded hero' style={{ backgroundImage: `url(${hero})` }} />
        </div>
      </div>
      <h1 className='mt-5 mb-5 text-center'>Recipes</h1>
      <div className='row'>
        <div className='col-12 col-lg-9'>
          <main className='mb-2'>
            {recipes.map(recipe => (
              <RecipeCard key={recipe._id} recipe={recipe} dispatch={dispatch} />
            ))}
          </main>
        </div>

        <Aside topFives={topFives} />
      </div>
    </div>
  );
}

export default withGlobalStore(Recipes);
