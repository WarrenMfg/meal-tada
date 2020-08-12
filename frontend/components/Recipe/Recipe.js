import React, { useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { fetchTopFiveRecipe, fetchInitAndCurrentRecipe } from '../../api/fetch';
import IngredientsAndSummary from './IngredientsAndSummary';
import Directions from './Directions';
import Aside from '../Aside/Aside';
import withGlobalStore from '../../store/withGlobalStore';
import '../styles/Recipe.css';

function Recipe({ state }) {
  const { currentRecipe } = state.recipes;
  const { dispatch } = state;
  const { pathname } = useLocation();
  useEffect(() => {
    // if empty object (in the case of page reload or direct navigation)
    // GlobalStore fetchInit does not run
    if (currentRecipe && !Object.keys(currentRecipe).length) {
      fetchInitAndCurrentRecipe(dispatch, pathname.split('/recipe')[1]);
    }
  }, []);

  useEffect(
    () => {
      // AsideTopFive component Links set currentRecipe to null
      // below will trigger a fetch when navigating from
      // Recipe component to Recipe component via AsideTopFive Links
      if (!currentRecipe) {
        fetchTopFiveRecipe(dispatch, pathname.split('/recipe')[1]);
      }
    },
    [ currentRecipe ]
  );

  const { goBack } = useHistory();
  const handleBackButton = () => {
    goBack();
  };

  if (state.loading.isLoading || !currentRecipe) {
    return null;
  } else {
    const { cardAndHeroImage, title, ingredients, time, summary, directions } = currentRecipe;
    const { topFives } = state.general;
    const { dispatch } = state;

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
            <button className='btn btn-info btn-block mt-5 mb-5' onClick={handleBackButton}>
              Back To All Recipes
            </button>
          </div>

          <Aside topFives={topFives} dispatch={dispatch} />
        </div>
      </div>
    );
  }
}

export default withGlobalStore(Recipe);
