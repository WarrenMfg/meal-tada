import React from 'react';
import { Link } from 'react-router-dom';
import { setCurrentRecipe } from '../actions/recipeActions';
import './styles/AsideTopFive.css';

function AsideTopFive({ topFive }) {
  const { title, recipes } = topFive;

  const handleTopFive = slug => {
    dispatch(setCurrentRecipe(slug));
  };
  return (
    <div className='aside-top-five'>
      <h2 className='text-center'>{title}</h2>
      <ul className='list-unstyled top-recipes mt-3'>
        {recipes.map((recipe, i) => (
          <li key={recipe.slug} className='rounded-top'>
            <Link to={`/recipe/${recipe.slug}`}>
              <span className='pr-2'>{i + 1}</span>
              <span>{recipe.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AsideTopFive;
