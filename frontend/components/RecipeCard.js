import React from 'react';
import { Link } from 'react-router-dom';
import { setCurrentRecipe } from '../actions/recipeActions';
import Picture from './Picture';
import PropTypes from 'prop-types';
import './styles/RecipeCard.css';

function RecipeCard({ recipe, dispatch }) {
  const { title, subtitle, cardAndHeroImage, summary, slug } = recipe;

  const handleRecipeLink = () => {
    dispatch(setCurrentRecipe(null));
  };

  return (
    <div className='card card-body mb-2'>
      <h2 className='text-center'>{title}</h2>
      <h3 className='text-muted text-center card-subtitle mb-2'>{subtitle}</h3>
      <div className='d-flex card-thumbnail-summary-container'>
        <Picture
          className='thumbnail rounded'
          url={cardAndHeroImage}
          width='1000'
          height='1000'
          alt={title}
          title={title}
          loading='lazy'
        />
        <div className='card-summary d-flex flex-column justify-content-between'>
          <p>{summary}</p>
          <Link
            className='btn btn-info btn-block'
            to={`/recipe/${slug}`}
            onClick={handleRecipeLink}
          >
            Recipe
          </Link>
        </div>
      </div>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    cardAndHeroImage: PropTypes.string.isRequired,
    ingredients: PropTypes.array.isRequired,
    time: PropTypes.object.isRequired,
    summary: PropTypes.string.isRequired,
    directions: PropTypes.array.isRequired,
    createdAt: PropTypes.number.isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default React.memo(RecipeCard, (prevProps, nextProps) => {
  if (prevProps.recipe === nextProps.recipe) {
    return true;
  } else {
    return false;
  }
});
