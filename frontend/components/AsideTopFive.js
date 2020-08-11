import React from 'react';
import { Link } from 'react-router-dom';
import { setCurrentRecipe } from '../actions/recipeActions';
import './styles/AsideTopFive.css';

function AsideTopFive({ topFive, dispatch }) {
  const { title, recipes } = topFive;

  const handleTopFive = () => {
    dispatch(setCurrentRecipe(null));
  };

  return (
    <div className='aside-top-five'>
      <h2 className='text-center'>{title}</h2>
      <ul className='list-unstyled top-recipes mt-3'>
        {recipes.map((recipe, i) => (
          <Link key={recipe.slug} to={`/recipe/${recipe.slug}`} onClick={handleTopFive}>
            <li className='rounded-top'>
              <span className='pr-2'>{i + 1}</span>
              <span>{recipe.title}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default AsideTopFive;
