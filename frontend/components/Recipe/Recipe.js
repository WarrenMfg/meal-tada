import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { updateMeta } from '../../utils/utils';
import { fetchCurrentRecipe } from '../../api/fetch';
import Picture from '../Picture';
import IngredientsAndSummary from './IngredientsAndSummary';
import Directions from './Directions';
import Aside from '../Aside/Aside';
import withGlobalStore from '../../store/withGlobalStore';
import PropTypes from 'prop-types';
import '../styles/Recipe.css';

function Recipe({ state }) {
  const { currentRecipe, recipes } = state.recipes;
  const { dispatch } = state;
  const { pathname } = useLocation();

  useEffect(() => {
    // when null, GlobalStore fetchInit does not run
    if (!currentRecipe) {
      dispatch(
        fetchCurrentRecipe,
        pathname.split('/recipe')[1],
        !!recipes.length
      );
    }
  }, [currentRecipe]);

  useEffect(() => {
    if (currentRecipe?.summary) {
      updateMeta({
        title: currentRecipe?.title,
        description: currentRecipe?.summary,
        image: currentRecipe?.cardAndHeroImage
      });
    }
  }, [currentRecipe?.summary]);

  const { goBack } = useHistory();
  const handleBackButton = () => {
    goBack();
  };

  if (state.loading.isLoading || !currentRecipe) {
    // LoadingMaskingDiv component is toggled on in fetch functions
    return null;
  } else {
    const {
      cardAndHeroImage,
      title,
      ingredients,
      time,
      servings,
      summary,
      directions,
      instagram
    } = currentRecipe;
    const { topFives } = state.general;
    const { dispatch } = state;

    return (
      <div className='container recipe mt-3'>
        <div className='row'>
          <div className='col'>
            <Picture
              className='rounded hero'
              url={cardAndHeroImage}
              width='1000'
              height='1000'
              alt={title}
              title={title}
              loading='eager'
            />
          </div>
        </div>
        <h1 className='mt-5 mb-5 text-center'>{title}</h1>
        <div className='row'>
          <div className='col-12 col-lg-9'>
            <IngredientsAndSummary
              ingredients={ingredients}
              time={time}
              servings={servings}
              summary={summary}
            />
            <Directions directions={directions} instagram={instagram} />
            <button
              className='btn btn-info btn-block mt-5 mb-5'
              onClick={handleBackButton}
            >
              Back
            </button>
          </div>

          <Aside topFives={topFives} dispatch={dispatch} />
        </div>
      </div>
    );
  }
}

Recipe.propTypes = {
  state: PropTypes.shape({
    recipes: PropTypes.shape({
      currentRecipe: PropTypes.any
    }).isRequired,
    dispatch: PropTypes.func.isRequired
  }).isRequired
};

export default withGlobalStore(Recipe);
