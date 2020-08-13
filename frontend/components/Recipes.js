import React, { useEffect, useRef } from 'react';
import RecipeCard from './RecipeCard';
import Aside from './Aside/Aside';
import { fetchMoreRecipes } from '../api/fetch';
import Loading from './Loading';
import hero from '../images/seasoned-edamame.jpg';
import withGlobalStore from '../store/withGlobalStore';
import './styles/Recipes.css';

function Recipes({ state }) {
  const { dispatch } = state;
  const { recipes } = state.recipes;
  const { topFives } = state.general;
  const { isFetchingMoreRecipes } = state.loading;

  const main = useRef(null);
  const lastRecipeCreatedAt = recipes[recipes.length - 1]?.createdAt;
  useEffect(() => {
    if (lastRecipeCreatedAt) {
      const infiniteScroll = () => {
        let isFetching = false;

        return async () => {
          const timeToFetch =
            // main bottom
            main.current.getBoundingClientRect().bottom -
              // window height
              window.innerHeight -
              // offset
              window.innerHeight <=
            // did the offset pass the threshold of zero?
            0;

          if (timeToFetch && !isFetching) {
            // use synchronous toggle instead of dispatch
            isFetching = true;
            // fetch and toggle appropiately with return value
            isFetching = await fetchMoreRecipes(dispatch, lastRecipeCreatedAt);
          }
        };
      };

      document.onscroll = infiniteScroll();
      // remove event listener
      return () => (document.onscroll = null);
    }
  }, [lastRecipeCreatedAt]);

  return (
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
          <main className='mb-2' ref={main}>
            {recipes.map(recipe => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                dispatch={dispatch}
              />
            ))}

            {isFetchingMoreRecipes && <Loading />}
          </main>
        </div>

        <Aside topFives={topFives} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default withGlobalStore(Recipes);
