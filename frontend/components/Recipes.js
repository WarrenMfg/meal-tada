import React from 'react';
import RecipeCard from './RecipeCard';
import Aside from './Aside';
import hero from '../images/seasoned-edamame.jpg';
import './styles/Recipes.css';

function Recipes() {
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
            {/* Recipes */}
            <RecipeCard />
          </main>
        </div>
        {/* Aside */}
        <Aside />
      </div>
    </div>
  );
}

export default Recipes;
