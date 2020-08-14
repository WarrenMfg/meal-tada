import React, { useEffect, useRef } from 'react';
import Meta from './Meta';
import RecipeCard from './RecipeCard';
import Aside from './Aside/Aside';
import { fetchMoreRecipes } from '../api/fetch';
import Loading from './Loading';
import hero from '../images/seasoned-edamame.jpg';
import withGlobalStore from '../store/withGlobalStore';
import PropTypes from 'prop-types';
import './styles/Recipes.css';

function Recipes({ state }) {
  const { dispatch } = state;
  const { recipes } = state.recipes;
  const { topFives, introduction } = state.general;
  const { isFetchingMoreRecipes } = state.loading;

  const observable = useRef(null);
  useEffect(() => {
    if (recipes.length) {
      // get createdAt for last recipe
      const lastRecipeCreatedAt = recipes[recipes.length - 1].createdAt;

      // what to do when observable crosses into threshold
      const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            dispatch(fetchMoreRecipes, lastRecipeCreatedAt);
            observer.unobserve(observable.current);
          }
        });
      };

      // create observer
      const observer = new IntersectionObserver(handleIntersect, {
        root: null,
        rootMargin: '100%',
        threshold: 0
      });

      // observe ref
      observer.observe(observable.current);
    }
  }, [recipes]);

  return (
    <>
      <Meta
        title='Meal Tada'
        description={introduction}
        image='https://i.postimg.cc/yYkxqC2F/seasoned-veggies.jpg'
      />
      <div className='container recipes mt-3'>
        <div className='row'>
          <div className='col'>
            <div
              className='rounded hero'
              style={{ backgroundImage: `url(${hero})` }}
            />
          </div>
        </div>
        <h1 className='mt-5 mb-5 text-center'>Recipes</h1>
        <div className='row'>
          <div className='col-12 col-lg-9'>
            <main className='mb-2'>
              {recipes.map(recipe => (
                <RecipeCard
                  key={recipe._id}
                  recipe={recipe}
                  dispatch={dispatch}
                />
              ))}

              {isFetchingMoreRecipes && <Loading />}
            </main>
            <div ref={observable}></div>
          </div>

          <Aside topFives={topFives} dispatch={dispatch} />
        </div>
      </div>
    </>
  );
}

Recipes.propTypes = {
  state: PropTypes.shape({
    recipes: PropTypes.shape({
      recipes: PropTypes.array.isRequired
    }).isRequired,
    general: PropTypes.shape({
      topFives: PropTypes.array.isRequired,
      introduction: PropTypes.string.isRequired
    }).isRequired,
    loading: PropTypes.shape({
      isFetchingMoreRecipes: PropTypes.bool.isRequired
    }).isRequired,
    dispatch: PropTypes.func.isRequired
  }).isRequired
};

export default withGlobalStore(Recipes);
