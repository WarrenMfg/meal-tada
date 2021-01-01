import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchForm from './SearchForm';
import Table from './Table';
import RecipeForm from './RecipeForm';
import Loading from '../Loading';
import { fetchAdminRecipeSearchResults } from '../../api/adminFetch';
import {
  clearAdminRecipeSearchResults,
  clearRecipeFormErrors
} from '../../actions/adminActions';
import {
  clearEditor,
  updateFormWithRecipe
} from '../../actions/adminEditorActions';

function RecipeTab({ state }) {
  const {
    admin: { adminRecipeSearchResults },
    adminEditor: activeRecipe,
    loading,
    dispatch
  } = state;

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchRecipes = e => {
    e.preventDefault();
    if (!searchQuery) return;
    dispatch(fetchAdminRecipeSearchResults, searchQuery);
    // update form
    dispatch(clearEditor());
    setSearchQuery('');
  };

  const handleClearSearchAndForm = e => {
    e.preventDefault();
    // clear errors
    dispatch(clearRecipeFormErrors());
    // clear search input
    setSearchQuery('');
    // clear search results
    dispatch(clearAdminRecipeSearchResults());
    // update form
    dispatch(clearEditor());
  };

  const handleClickRow = ({ target }) => {
    // clear errors
    dispatch(clearRecipeFormErrors());
    // clear form
    dispatch(clearEditor());
    // remove active recipe classes
    Array.from(target.closest('tbody').children).forEach(child =>
      child.classList.remove('bg-primary', 'text-white')
    );
    // handle click
    const row = target.closest('tr');
    const recipe = adminRecipeSearchResults.find(obj => obj._id === row.id);
    // if click on active recipe, it's already toggled off, so do nothing;
    // otherwise, if click on different recipe, toggle on
    if (recipe._id !== activeRecipe._id) {
      row.classList.add('bg-primary', 'text-white');
      dispatch(updateFormWithRecipe(recipe));
    }
  };

  return (
    <div className='tab-pane active' role='tabpanel' id='tab-1'>
      <SearchForm
        inputPlaceholder='Search recipes'
        inputValue={searchQuery}
        inputOnChangeHandler={setSearchQuery}
        searchButtonHandler={handleSearchRecipes}
        clearButtonHandler={handleClearSearchAndForm}
      />

      {loading.isSearching && <Loading />}

      {!!adminRecipeSearchResults.length && (
        <Table
          title='Recipe Search Results'
          rows={adminRecipeSearchResults}
          handleClickRow={handleClickRow}
        />
      )}

      <RecipeForm activeRecipe={activeRecipe} dispatch={dispatch} />
    </div>
  );
}

RecipeTab.propTypes = {
  state: PropTypes.object.isRequired
};

export default RecipeTab;
