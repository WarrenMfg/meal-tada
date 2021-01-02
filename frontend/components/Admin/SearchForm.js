import React from 'react';
import PropTypes from 'prop-types';
import './styles/SearchForm.css';

function SearchForm({
  inputPlaceholder,
  inputValue,
  inputOnChangeHandler,
  searchButtonHandler,
  clearButtonHandler
}) {
  return (
    <form className='mb-4 search-form'>
      <label>Search</label>
      <input
        type='text'
        className='form-control flex-grow-1'
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={({ target }) => inputOnChangeHandler(target.value)}
      />
      <div className='d-flex btn-group'>
        <button className='btn btn-info' onClick={searchButtonHandler}>
          Search
        </button>
        <button className='btn btn-dark' onClick={clearButtonHandler}>
          Clear
        </button>
      </div>
    </form>
  );
}

SearchForm.propTypes = {
  inputPlaceholder: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  inputOnChangeHandler: PropTypes.func.isRequired,
  searchButtonHandler: PropTypes.func.isRequired,
  clearButtonHandler: PropTypes.func.isRequired
};

export default SearchForm;
