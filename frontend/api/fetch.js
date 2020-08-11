import { isLoading, isNotLoading } from '../actions/loadingActions';
import { addError, clearError } from '../actions/errorActions';
import { addInitialRecipes, setCurrentRecipe } from '../actions/recipeActions';
import { addIntroAndAbout } from '../actions/generalActions';
import { parseAndHandleErrors } from '../utils/utils';

export const fetchInit = async dispatch => {
  try {
    dispatch(clearError());
    dispatch(isLoading());

    const res = await fetch('/api/init');
    const data = await parseAndHandleErrors(res);

    dispatch(addInitialRecipes(data.initialRecipes));
    dispatch(addIntroAndAbout(data.general));
  } catch (err) {
    dispatch(addError(err.message));
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
    dispatch(addInitialRecipes(data.initialRecipes));
    dispatch(addIntroAndAbout(data.general));
  } catch (err) {
    dispatch(addError(err.message));
    console.log(err.message, err.stack);
  } finally {
    dispatch(isNotLoading());
  }
};
