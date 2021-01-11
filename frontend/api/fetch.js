/* eslint-disable no-console */

import {
  isLoading,
  isNotLoading,
  isSearching,
  isNotSearching,
  isFetchingMoreRecipes,
  isNotFetchingMoreRecipes
} from '../actions/loadingActions';
import { setError, clearError } from '../actions/errorActions';
import {
  setInitialRecipes,
  setCurrentRecipe,
  addMoreRecipes
} from '../actions/recipeActions';
import { setGeneral, setImageScrambleURLs } from '../actions/generalActions';
import {
  setCategories,
  setSearchCriteria,
  setSearchResults,
  clearSearchResults,
  setSearchFeedback
} from '../actions/searchActions';
import { parseAndHandleErrors } from '../utils/utils';

export const fetchInit = async dispatch => {
  try {
    dispatch(clearError());
    dispatch(isLoading());

    const res = await fetch('/api/init');
    const data = await parseAndHandleErrors(res);

    dispatch(setInitialRecipes(data.initialRecipes));

    const { categories, ...general } = data.general;
    dispatch(setGeneral(general));
    dispatch(setCategories(categories));
  } catch (err) {
    dispatch(setError('An error has occurred 😭'));
    console.error(err.message, err.stack);
  } finally {
    dispatch(isNotLoading());
  }
};

export const fetchCurrentRecipe = async (dispatch, pathname, isAlreadyInit) => {
  try {
    dispatch(clearError());
    dispatch(isLoading());

    const initAnd = isAlreadyInit ? '' : 'init-and-';
    const res = await fetch(`/api/${initAnd}current-recipe${pathname}`);
    const data = await parseAndHandleErrors(res);

    dispatch(setCurrentRecipe(data.currentRecipe));

    if (!isAlreadyInit) {
      dispatch(setInitialRecipes(data.initialRecipes));
      const { categories, ...general } = data.general;
      dispatch(setGeneral(general));
      dispatch(setCategories(categories));
    }
  } catch (err) {
    if (err.route) {
      window.location.replace(err.route);
    } else {
      dispatch(setError('An error has occurred 😭'));
      console.error(err.message, err.stack);
    }
  } finally {
    dispatch(isNotLoading());
  }
};

export const fetchMoreRecipes = async (dispatch, lastRecipeCreatedAt) => {
  try {
    dispatch(clearError());
    dispatch(isFetchingMoreRecipes());

    const res = await fetch(`/api/more-recipes/${lastRecipeCreatedAt}`);
    const data = await parseAndHandleErrors(res);

    if (data.length) {
      dispatch(addMoreRecipes(data));
    }
  } catch (err) {
    dispatch(setError('An error has occurred 😭'));
    console.error(err.message, err.stack);
  } finally {
    dispatch(isNotFetchingMoreRecipes());
  }
};

export const fetchSearchResults = async (dispatch, query, searchCriteria) => {
  try {
    dispatch(setSearchFeedback(0));
    dispatch(setSearchCriteria(searchCriteria));
    dispatch(clearSearchResults());
    dispatch(clearError());
    dispatch(isSearching());

    const res = await fetch(`/api/search?${query}`);
    const data = await parseAndHandleErrors(res);

    if (data.length) {
      dispatch(setSearchResults(data));
    } else {
      dispatch(setSearchFeedback(2));
    }
  } catch (err) {
    dispatch(setError('An error has occurred 😭'));
    console.error(err.message, err.stack);
  } finally {
    dispatch(isNotSearching());
  }
};

export const fetchImageScramble = async (dispatch, slug) => {
  const imageLoad = resolve => resolve(true);
  const imageError = resolve => resolve(false);

  try {
    const url = 'https://meal-tada.s3.amazonaws.com/_image-scramble/';
    const img = new Image();
    img.src = `${url}0-${slug}.jpg`;

    // test if load or error
    const isFound = await new Promise(resolve => {
      img.addEventListener('load', () => imageLoad(resolve));
      img.addEventListener('error', () => imageError(resolve));
    });
    img.removeEventListener('load', imageLoad);
    img.removeEventListener('error', imageError);

    if (!isFound) {
      // image did not load
      const res = await fetch(`/api/image-scramble/${slug}`);
      await parseAndHandleErrors(res);
    }

    // image either successfully loaded or uploaded to aws on the backend
    dispatch(
      setImageScrambleURLs(
        new Array(9).fill(null).map((val, i) => `${url}${i}-${slug}.jpg`)
      )
    );
  } catch (err) {
    dispatch(setError('An error has occurred 😭'));
    console.error(err.message, err.stack);
  }
};
