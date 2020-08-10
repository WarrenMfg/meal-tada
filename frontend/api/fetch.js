import { isLoading, isNotLoading } from '../actions/loadingActions';
import { addError, clearError } from '../actions/errorActions';
import { addLatestRecipes } from '../actions/recipeActions';
import { addIntroAndAbout } from '../actions/generalActions';
import { parseAndHandleErrors } from '../utils/utils';

export const fetchGeneralAndLatestRecipes = async dispatch => {
  try {
    dispatch(clearError());
    dispatch(isLoading());

    const res = await fetch('/api/home');
    const data = await parseAndHandleErrors(res);

    dispatch(addLatestRecipes(data.latestRecipes));
    dispatch(addIntroAndAbout(data.general));
  } catch (err) {
    dispatch(addError(err.message));
    console.log(err.message, err.stack);
  } finally {
    dispatch(isNotLoading());
  }
};
