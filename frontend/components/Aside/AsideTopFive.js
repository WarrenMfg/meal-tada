import React from 'react';
import { Link } from 'react-router-dom';
import Picture from '../Picture';
import { setCurrentRecipe } from '../../actions/recipeActions';
import PropTypes from 'prop-types';
import '../styles/AsideTopFive.css';

function AsideTopFive({ topFive, dispatch }) {
  const { title, recipes } = topFive;

  const handleRecipeLink = () => {
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
            onClick={handleRecipeLink}
            className='top-five-link'
            title={recipe.title}
          >
            <li className='text-center'>
              <div className='thumbnail-container'>
                <Picture
                  className='aside-top-five-image'
                  url={recipe.cardAndHeroImage}
                  width='1000'
                  height='1000'
                  alt={recipe.title}
                  title={recipe.title}
                  loading='lazy'
                />
              </div>
              <span className='clamp-container'>
                <span className='clamp'>{recipe.title}</span>
              </span>
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
