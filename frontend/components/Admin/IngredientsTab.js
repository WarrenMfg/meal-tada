import React, { useState } from 'react';
import toast from 'react-hot-toast';
import SearchForm from './SearchForm';
import Loading from '../Loading';
import Table from './Table';
import {
  fetchSearchIngredientsResults,
  fetchUpsertIngredient
} from '../../api/adminFetch';
import {
  clearAdminIngredientsSearchResults,
  clearIngredientFormErrors,
  setIngredientFormErrors
} from '../../actions/adminActions';
import {
  clearAdminIngredientForm,
  updateFormWithIngredient,
  updateIngredientProperty
} from '../../actions/adminIngredientsActions';
import PropTypes from 'prop-types';

function IngredientsTab({ state }) {
  const {
    admin: { adminIngredientsSearchResults },
    adminIngredient,
    loading,
    dispatch
  } = state;
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (key, value) => {
    dispatch(updateIngredientProperty({ key, value }));
  };

  const handleSearchIngredients = e => {
    e.preventDefault();

    if (!searchQuery) return;
    dispatch(fetchSearchIngredientsResults, searchQuery);
  };

  const handleClearIngredientsAndForm = e => {
    e.preventDefault();

    setSearchQuery('');
    dispatch(clearAdminIngredientsSearchResults());
    dispatch(clearAdminIngredientForm());
  };

  const handleClickRow = ({ target }) => {
    // clear errors
    dispatch(clearIngredientFormErrors());
    // clear active ingredient state
    dispatch(clearAdminIngredientForm());
    // remove active ingredient classes
    Array.from(target.closest('tbody').children).forEach(child =>
      child.classList.remove('bg-primary', 'text-white')
    );
    // handle click
    const row = target.closest('tr');
    const ingredient = adminIngredientsSearchResults.find(
      obj => obj._id === row.id
    );
    // if click on active ingredient, it's already toggled off, so do nothing;
    // otherwise, if click on different ingredient, toggle on
    if (ingredient._id !== adminIngredient._id) {
      row.classList.add('bg-primary', 'text-white');
      // update state with active ingredient
      dispatch(updateFormWithIngredient(ingredient));
    }
  };

  const handleCopyIngredients = async () => {
    if (!adminIngredient.notes.trim()) return;
    await navigator.clipboard.writeText(adminIngredient.notes);
    toast.success('Notes copied!');
  };

  const handleGoToDirections = () => {
    document.querySelector('a[href="#tab-1"]').click();
    document
      .querySelector('#directions')
      .scrollIntoView({ block: 'center', behavior: 'smooth' });
  };

  const isValid = () => {
    const validation = [];

    if (!adminIngredient.ingredient.trim()) validation.push('ingredient');
    if (!adminIngredient.notes.trim()) validation.push('notes');

    return validation;
  };

  const handleSubmitIngredient = e => {
    e.preventDefault();

    const validation = isValid();
    if (validation.length) {
      dispatch(setIngredientFormErrors(validation));
      window.scrollTo(0, 0);
      toast.error('Please fix form errors.');
    } else {
      dispatch(fetchUpsertIngredient, adminIngredient);
    }
  };

  return (
    <div className='tab-pane' role='tabpanel' id='tab-2'>
      <SearchForm
        inputPlaceholder='Search ingredients'
        inputValue={searchQuery}
        inputOnChangeHandler={setSearchQuery}
        searchButtonHandler={handleSearchIngredients}
        clearButtonHandler={handleClearIngredientsAndForm}
      />

      {loading.isSearching && <Loading />}

      {!!adminIngredientsSearchResults.length && (
        <Table
          title='Ingredients Search Results'
          rows={adminIngredientsSearchResults}
          handleClickRow={handleClickRow}
        />
      )}

      <form className='mt-5' onSubmit={e => e.preventDefault()}>
        <div className='form-group' id='ingredients'>
          <label>Ingredient</label>
          <input
            type='text'
            className='form-control ingredient-validation'
            placeholder='Ingredient'
            name='ingredient'
            value={adminIngredient.ingredient}
            onChange={({ target }) =>
              handleInputChange(target.name, target.value)
            }
            onFocus={({ target }) => target.classList.remove('is-invalid')}
          />
        </div>

        <div className='form-group'>
          <label>
            Notes{' '}
            <span
              className='ml-2'
              onClick={handleCopyIngredients}
              role='button'
              title='Copy Notes'
            >
              <i className='fas fa-copy'></i>
            </span>
            <span
              className='ml-3'
              onClick={handleGoToDirections}
              role='button'
              title='Go to Directions'
            >
              <i className='fas fa-hamburger'></i>
            </span>
          </label>
          <textarea
            className='form-control ingredient-validation'
            placeholder='Notes'
            rows={10}
            name='notes'
            value={adminIngredient.notes}
            onChange={({ target }) =>
              handleInputChange(target.name, target.value)
            }
            onFocus={({ target }) => target.classList.remove('is-invalid')}
          />
        </div>

        <button
          className='btn btn-primary btn-block mt-3'
          type='button'
          onClick={handleSubmitIngredient}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

IngredientsTab.propTypes = {
  state: PropTypes.object.isRequired
};

export default IngredientsTab;
