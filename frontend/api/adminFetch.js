import {
  setAdminRecipeSearchResults,
  clearAdminRecipeSearchResults
} from '../actions/adminActions';
import { isSearching, isNotSearching } from '../actions/loadingActions';
import { parseAndHandleErrors } from '../utils/utils';

export const fetchAdminRecipeSearchResults = async (dispatch, query) => {
  try {
    dispatch(isSearching());
    dispatch(clearAdminRecipeSearchResults());

    const res = await fetch(`/api/search?phrase=${query}`);
    const data = await parseAndHandleErrors(res);

    if (data.length) {
      dispatch(setAdminRecipeSearchResults(data));
    }
  } catch (err) {
    console.log(err.message, err.stack);
  } finally {
    dispatch(isNotSearching());
  }
};
