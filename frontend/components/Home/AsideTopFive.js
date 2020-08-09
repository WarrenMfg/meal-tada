import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AsideTopFive.css';

function AsideTopFive() {
  return (
    <div className='aside-top-five'>
      <h2 className='text-center'>Top Recipes</h2>
      <ul className='list-unstyled top-recipes mt-3'>
        <li className='rounded-top'>
          <Link to={`/recipe/${'top-five'}`}>
            <span className='pr-2'>1</span>
            <span>Garlic Aoli</span>
          </Link>
        </li>
        <li>
          <Link to={`/recipe/${'top-five'}`}>
            <span className='pr-2'>2</span>
            <span>Chicken Tacos</span>
          </Link>
        </li>
        <li>
          <Link to={`/recipe/${'top-five'}`}>
            <span className='pr-2'>3</span>
            <span>Greek Salad</span>
          </Link>
        </li>
        <li>
          <Link to={`/recipe/${'top-five'}`}>
            <span className='pr-2'>4</span>
            <span>Summer Pasta Salad</span>
          </Link>
        </li>
        <li className='rounded-bottom'>
          <Link to={`/recipe/${'top-five'}`}>
            <span className='pr-2'>5</span>
            <span>Immunity Smoothie</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AsideTopFive;
