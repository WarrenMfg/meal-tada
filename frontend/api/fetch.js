import { useHistory } from 'react-router-dom';
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
import { setGeneral } from '../actions/generalActions';
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
    console.log(err.message, err.stack);
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
    console.log(err.message, err.stack);
  } finally {
    dispatch(isNotFetchingMoreRecipes());
  }
};

export const fetchInitAndCurrentRecipe = async (dispatch, pathname) => {
  try {
    dispatch(clearError());
    dispatch(isLoading());

    const res = await fetch(`/api/init-and-current-recipe${pathname}`);
    const data = await parseAndHandleErrors(res);

    if (!data.currentRecipe) throw new Error();

    dispatch(setCurrentRecipe(data.currentRecipe));
    dispatch(setInitialRecipes(data.initialRecipes));

    const { categories, ...general } = data.general;
    dispatch(setGeneral(general));
    dispatch(setCategories(categories));
  } catch {
    window.location.replace('/');
  } finally {
    dispatch(isNotLoading());
  }
};

export const fetchTopFiveRecipe = async (dispatch, pathname) => {
  try {
    dispatch(clearError());
    dispatch(isLoading());

    const res = await fetch(`/api/top-five-recipe${pathname}`);
    const data = await parseAndHandleErrors(res);

    dispatch(setCurrentRecipe(data));
  } catch (err) {
    dispatch(setError('An error has occurred 😭'));
    console.log(err.message, err.stack);
  } finally {
    dispatch(isNotLoading());
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
    console.log(err.message, err.stack);
  } finally {
    dispatch(isNotSearching());
  }
};
