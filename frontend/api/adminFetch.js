import toast from 'react-hot-toast';
import {
  setAdminRecipeSearchResults,
  clearAdminRecipeSearchResults
} from '../actions/adminActions';
import { initializeState } from '../actions/adminEditorActions';
import { adminEditorInitialState } from '../reducers/adminEditorReducer';
import {
  isLoading,
  isNotLoading,
  isSearching,
  isNotSearching
} from '../actions/loadingActions';
import { parseAndHandleErrors } from '../utils/utils';
import { getHeaders } from '../utils/adminUtils';

export const fetchAdminRecipeSearchResults = async (dispatch, query) => {
  try {
    dispatch(isSearching());
    dispatch(clearAdminRecipeSearchResults());

    const res = await fetch(`/api/admin/search?phrase=${query}`, {
      headers: getHeaders()
    });
    const data = await parseAndHandleErrors(res);

    if (data.length) {
      dispatch(setAdminRecipeSearchResults(data));
    } else {
      toast('No search results.', { icon: '🧐' });
    }
  } catch (err) {
    console.log(err.message, err.stack);
  } finally {
    dispatch(isNotSearching());
  }
};

export const fetchUpsertRecipe = async (dispatch, recipe, isSubmit) => {
  try {
    dispatch(isLoading());

    const res = await fetch('/api/upsertRecipe', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(recipe)
    });
    const data = await parseAndHandleErrors(res);

    window.scrollTo(0, 0);

    if (isSubmit) {
      // clear form
      dispatch(initializeState(adminEditorInitialState));
      toast.success('Recipe submitted!');
    } else {
      // populate form with upserted data
      dispatch(initializeState(data));
      toast.success('Recipe updated!');
    }
  } catch (err) {
    toast.error('Oops, something went wrong');
    console.error(err);
  } finally {
    dispatch(isNotLoading());
  }
};
