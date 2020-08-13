import React from 'react';
import { Link } from 'react-router-dom';
import { setCurrentRecipe } from '../../actions/recipeActions';
import PropTypes from 'prop-types';
import '../styles/AsideTopFive.css';

function AsideTopFive({ topFive, dispatch }) {
  const { title, recipes } = topFive;

  const handleTopFive = () => {
    dispatch(setCurrentRecipe(null));
  };

  return (
    <div className='aside-top-five'>
      <h2 className='text-center'>{title}</h2>
      <ul className='list-unstyled mt-3'>
        {recipes.map(recipe => (
          <Link
            key={recipe.slug}
            to={`/recipe/${recipe.slug}`}
            onClick={handleTopFive}
            className='top-five-link'
          >
            <li className='text-center'>
              <span>{recipe.title}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

AsideTopFive.propTypes = {
  topFive: PropTypes.shape({
    title: PropTypes.string.isRequired,
    recipes: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default AsideTopFive;
