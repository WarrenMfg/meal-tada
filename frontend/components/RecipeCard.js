import React from 'react';
import { Link } from 'react-router-dom';
import './styles/RecipeCard.css';

function RecipeCard() {
  return (
    <div className='card card-body'>
      <h2 className='text-center'>Flank Steak and French Fries</h2>
      <h3 className='text-muted text-center card-subtitle mb-2'>Excepteur sint occaecat</h3>
      <div className='card-thumbnail-summary-container'>
        <div className='thumbnail rounded mr-3' />
        <div className='card-summary d-flex flex-column justify-content-between'>
          <p>
            Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac
            facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui.
          </p>
          <Link className='btn btn-info btn-block' to={`/recipe/${'flank-steak-and-french-fries'}`}>
            Recipe
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
