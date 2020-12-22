import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import RecipeForm from './RecipeForm';
import Loading from '../Loading';
import { fetchAdminRecipeSearchResults } from '../../api/fetch';
import {
  clearAdminRecipeSearchResults,
  setActiveRecipe
} from '../../actions/adminActions';
import searchIcon from '../../images/magnifier.png';

function RecipeTab({ state }) {
  const {
    dispatch,
    loading,
    admin: { adminRecipeSearchResults, activeRecipe }
  } = state;
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchRecipes = e => {
    e.preventDefault();
    if (!searchQuery) return;
    dispatch(fetchAdminRecipeSearchResults, searchQuery);
    setSearchQuery('');
  };

  const handleAddNewRecipe = () => {
    dispatch(clearAdminRecipeSearchResults());
    dispatch(setActiveRecipe({}));
  };

  const handleClickRow = ({ target }) => {
    const row = target.closest('tr');
    const recipe = adminRecipeSearchResults.find(obj => obj._id === row.id);
    console.log(recipe);
    dispatch(setActiveRecipe(recipe));
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

      {activeRecipe && (
        <RecipeForm activeRecipe={activeRecipe} dispatch={dispatch} />
      )}
    </div>
  );
}

RecipeTab.propTypes = {
  state: PropTypes.object.isRequired
};

export default RecipeTab;