import { isLoading, isNotLoading, isSearching, isNotSearching } from '../actions/loadingActions';
import { setError, clearError } from '../actions/errorActions';
import { setInitialRecipes, setCurrentRecipe } from '../actions/recipeActions';
import { setGeneral } from '../actions/generalActions';
import { setCategories, setSearchResults, clearSearchResults } from '../actions/searchActions';
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
    dispatch(setError(err.message));
    console.log(err.message, err.stack);
  } finally {
    dispatch(isNotLoading());
  }
};

export const fetchInitAndCurrentRecipe = async (dispatch, pathname) => {
  try {
    dispatch(clearError());
    dispatch(isLoading());

    const res = await fetch(`/api/init-and-current-recipe${pathname}`);
    const data = await parseAndHandleErrors(res);

    dispatch(setCurrentRecipe(data.currentRecipe));
    dispatch(setInitialRecipes(data.initialRecipes));

    const { categories, ...general } = data.general;
    dispatch(setGeneral(general));
    dispatch(setCategories(categories));
  } catch (err) {
    dispatch(setError(err.message));
    console.log(err.message, err.stack);
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

    dispatch(setCurrentRecipe(data.currentRecipe));
  } catch (err) {
    dispatch(setError(err.message));
    console.log(err.message, err.stack);
  } finally {
    dispatch(isNotLoading());
  }
};

export const fetchSearchResults = async (dispatch, query) => {
  try {
    dispatch(clearSearchResults());
    dispatch(clearError());
    dispatch(isSearching());

    const res = await fetch(`/api/search?${query}`);
    const data = await parseAndHandleErrors(res);

    await new Promise(resolve => setTimeout(() => resolve(), 3000));

    dispatch(setSearchResults(data));
  } catch (err) {
    dispatch(setError(err.message));
    console.log(err.message, err.stack);
  } finally {
    dispatch(isNotSearching());
  }
};
