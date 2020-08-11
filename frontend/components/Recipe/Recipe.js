import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchInitAndCurrentRecipe } from '../../api/fetch';
import IngredientsAndSummary from './IngredientsAndSummary';
import Directions from './Directions';
import Aside from '../Aside';
import withGlobalStore from '../../store/withGlobalStore';
import '../styles/Recipe.css';

function Recipe({ state }) {
  const { currentRecipe } = state.recipes;
  const { pathname } = useLocation();
  useEffect(() => {
    if (!Object.keys(currentRecipe).length) {
      fetchInitAndCurrentRecipe(state.dispatch, pathname.split('/recipe')[1]);
    }
  }, []);

  if (state.loading.isLoading) {
    return null;
  } else {
    const { cardAndHeroImage, title, ingredients, time, summary, directions } = currentRecipe;
    const { topFives } = state.general;
    return (
      <div className='container recipe'>
        <div className='row'>
          <div className='col'>
            <div className='hero rounded' style={{ backgroundImage: `url(${cardAndHeroImage})` }} />
          </div>
        </div>
        <h1 className='mt-5 mb-5 text-center'>{title}</h1>
        <div className='row'>
          <div className='col-12 col-lg-9'>
            <IngredientsAndSummary ingredients={ingredients} time={time} summary={summary} />
            <Directions directions={directions} />
            <Link className='btn btn-info btn-block mt-5 mb-5' to='/recipes'>
              Back To All Recipes
            </Link>
          </div>

          <Aside topFives={topFives} />
        </div>
      </div>
    );
  }
}

export default withGlobalStore(Recipe);
