import React from 'react';
import { Link } from 'react-router-dom';
import Ingredients from './Ingredients';
import Directions from './Directions';
import Aside from '../Aside';
import hero from '../../images/steak.jpg';
import '../styles/Recipe.css';

function Recipe() {
  return (
    <div className='container recipe'>
      <div className='row'>
        <div className='col'>
          <div className='hero rounded' style={{ backgroundImage: `url(${hero})` }} />
        </div>
      </div>
      <h1 className='mt-5 mb-5 text-center'>Meal Title</h1>
      <div className='row'>
        <div className='col-12 col-lg-9'>
          {/* <Ingredients /> */}
          {/* <Directions /> */}
          <Link className='btn btn-info btn-block mt-5 mb-5' to='/recipes'>
            Back To All Recipes
          </Link>
        </div>

        {/* Aside */}
        <Aside />
      </div>
    </div>
  );
}

export default Recipe;
