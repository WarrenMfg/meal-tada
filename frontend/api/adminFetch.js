/* eslint-disable no-console */

import React from 'react';
import toast from 'react-hot-toast';
import {
  setAdminRecipeSearchResults,
  clearAdminRecipeSearchResults,
  updateAdminRecipeSearchResults,
  setAdminIngredientsSearchResults,
  clearAdminIngredientsSearchResults,
  updateAdminIngredientsSearchResults,
  setMealIdeasResults
} from '../actions/adminActions';
import { updateFormWithRecipe } from '../actions/adminEditorActions';
import { updateFormWithIngredient } from '../actions/adminIngredientsActions';
import {
  isLoadingMealIdeas,
  isNotLoadingMealIdeas,
  clearMealIdeaModal,
  clearMealIdeaFormAndModal
} from '../actions/adminMealIdeasActions';
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

    const res = await fetch(`/api/admin/searchRecipes?phrase=${query}`, {
      headers: getHeaders()
    });
    const data = await parseAndHandleErrors(res);

    if (data.length) {
      dispatch(setAdminRecipeSearchResults(data));
    } else {
      toast('No search results.', { icon: '🧐' });
    }
  } catch (err) {
    toast.error('Oops, something went wrong');
    console.error(err.message, err.stack);
  } finally {
    dispatch(isNotSearching());
  }
};

export const fetchUpsertRecipe = async (dispatch, recipe) => {
  try {
    dispatch(isLoading());

    const res = await fetch('/api/upsertRecipe', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(recipe)
    });
    const data = await parseAndHandleErrors(res);

    window.scrollTo(0, 0);

    // update title of searched/updated recipe in search results
    dispatch(updateAdminRecipeSearchResults(data));
    // populate form with upserted data
    dispatch(updateFormWithRecipe(data));
    toast.success(
      <span className='text-center'>
        <span>
          Submitted and{' '}
          <span className='font-weight-bold'>{!data.isPublished && 'not'}</span>{' '}
          published!
        </span>
      </span>
    );
  } catch (err) {
    toast.error('Oops, something went wrong');
    console.error(err.message, err.stack);
  } finally {
    dispatch(isNotLoading());
  }
};

export const fetchSearchIngredientsResults = async (dispatch, query) => {
  try {
    dispatch(isSearching());
    dispatch(clearAdminIngredientsSearchResults());

    const res = await fetch(`/api/admin/searchIngredients?phrase=${query}`, {
      headers: getHeaders()
    });
    const data = await parseAndHandleErrors(res);

    if (data.length) {
      dispatch(setAdminIngredientsSearchResults(data));
    } else {
      toast('No ingredients results.', { icon: '🧐' });
    }
  } catch (err) {
    toast.error('Oops, something went wrong');
    console.error(err.message, err.stack);
  } finally {
    dispatch(isNotSearching());
  }
};

export const fetchUpsertIngredient = async (dispatch, ingredient) => {
  try {
    dispatch(isLoading());

    const res = await fetch('/api/upsertIngredient', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(ingredient)
    });
    const data = await parseAndHandleErrors(res);

    window.scrollTo(0, 0);

    // update title of searched/updated ingredient in search results
    dispatch(updateAdminIngredientsSearchResults(data));
    // populate form with upserted data
    dispatch(updateFormWithIngredient(data));
    toast.success('Ingredient updated!');
  } catch (err) {
    toast.error('Oops, something went wrong');
    console.error(err.message, err.stack);
  } finally {
    dispatch(isNotLoading());
  }
};

export const fetchAdminGetMealIdeas = async dispatch => {
  try {
    dispatch(isLoadingMealIdeas());

    const res = await fetch('/api/getMealIdeas', {
      headers: getHeaders()
    });
    const data = await parseAndHandleErrors(res);

    dispatch(setMealIdeasResults(data));
  } catch (err) {
    toast.error('Oops, something went wrong');
    console.error(err.message, err.stack);
  } finally {
    dispatch(isNotLoadingMealIdeas());
  }
};

export const fetchAdminUpsertMealIdea = async (
  dispatch,
  mealIdea,
  shouldClearMealIdeaFormAndModal
) => {
  try {
    dispatch(isLoadingMealIdeas());

    const res = await fetch('/api/upsertMealIdea', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(mealIdea)
    });
    const data = await parseAndHandleErrors(res);

    dispatch(setMealIdeasResults(data));

    if (shouldClearMealIdeaFormAndModal) {
      dispatch(clearMealIdeaFormAndModal());
    } else {
      dispatch(clearMealIdeaModal());
    }
    toast.success('Meal idea updated!');
  } catch (err) {
    toast.error('Oops, something went wrong');
    console.error(err.message, err.stack);
  } finally {
    dispatch(isNotLoadingMealIdeas());
  }
};

export const fetchAdminDeleteMealIdea = async (dispatch, _id) => {
  try {
    dispatch(isLoadingMealIdeas());

    const res = await fetch(`/api/deleteMealIdea/${_id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    const data = await parseAndHandleErrors(res);

    dispatch(setMealIdeasResults(data));
    toast.success('Meal idea deleted!');
  } catch (err) {
    toast.error('Oops, something went wrong');
    console.error(err.message, err.stack);
  } finally {
    dispatch(isNotLoadingMealIdeas());
  }
};
