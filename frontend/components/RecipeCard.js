import React from 'react';
import { Link } from 'react-router-dom';
import './styles/RecipeCard.css';

function RecipeCard({ recipe }) {
  const { title, subtitle, cardAndHeroImage, summary, slug } = recipe;
  return (
    <div className='card card-body mb-2'>
      <h2 className='text-center'>{title}</h2>
      <h3 className='text-muted text-center card-subtitle mb-2'>{subtitle}</h3>
      <div className='card-thumbnail-summary-container'>
        <div
          className='thumbnail rounded mr-3'
          style={{ backgroundImage: `url(${cardAndHeroImage})` }}
        />
        <div className='card-summary d-flex flex-column justify-content-between'>
          <p>{summary}</p>
          <Link className='btn btn-info btn-block' to={`/recipe/${slug}`}>
            Recipe
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
