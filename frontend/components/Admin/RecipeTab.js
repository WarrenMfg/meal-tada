import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
import searchIcon from '../../images/magnifier.png';

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

  const handleAddNewRecipe = () => {
    // clear errors
    dispatch(clearRecipeFormErrors());
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
      <button
        className='btn btn-success btn-block mt-4 mb-4'
        type='button'
        onClick={handleAddNewRecipe}
      >
        Add New Recipe
      </button>
      <form className='d-flex mb-4'>
        <input
          type='text'
          className='search-input flex-grow-1'
          placeholder='Search recipes'
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
        />
        <button className='btn btn-light' onClick={handleSearchRecipes}>
          <img src={searchIcon} />
        </button>
      </form>

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
