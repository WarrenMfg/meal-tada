import React, { useEffect, useState } from 'react';
import { fetchSearchResults } from '../../api/fetch';
import {
  clearSearchResults,
  setSearchFeedback,
  clearSearchCriteria
} from '../../actions/searchActions';
import PropTypes from 'prop-types';
import '../styles/SearchForm.css';

function SearchForm({ categories, searchCriteria, searchFeedback, dispatch }) {
  const [searchInput, setSearchInput] = useState(searchCriteria.searchInput);
  const [searchExact, setSearchExact] = useState(searchCriteria.searchExact);
  const [searchCategories, setSearchCategories] = useState(
    searchCriteria.searchCategories
  );
  const [searchTime, setSearchTime] = useState(searchCriteria.searchTime);
  const [searchServings, setSearchServings] = useState(
    searchCriteria.searchServings
  );

  useEffect(() => {
    if (searchFeedback === 2) {
      dispatch(setSearchFeedback(1));
      setSearchInput('');
      setSearchExact(false);
      setSearchCategories({});
      setSearchTime('');
      setSearchServings('');
    }
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    let categorySelected = false;
    let trimmedSearchInput = searchInput.trim();
    setSearchInput(trimmedSearchInput);

    let query = `phrase=${trimmedSearchInput}&exact=${searchExact}`;
    Object.entries(searchCategories).forEach(tuple => {
      if (tuple[1]) {
        categorySelected = true;
        query += `&categories[]=${tuple[0]}`;
      }
    });

    if (searchTime) {
      query += searchTime;
    }
    if (searchServings) {
      query += searchServings;
    }

    if (
      trimmedSearchInput ||
      categorySelected ||
      searchTime ||
      searchServings
    ) {
      const searchCriteria = {
        searchInput: trimmedSearchInput,
        searchExact,
        searchCategories,
        searchTime,
        searchServings
      };
      dispatch(fetchSearchResults, query, searchCriteria);
    }
  };

  const handleClear = e => {
    e.preventDefault();
    if (
      searchInput ||
      searchExact ||
      Object.values(searchCategories).some(bool => bool) ||
      searchTime ||
      searchServings
    ) {
      dispatch(clearSearchResults());
      dispatch(clearSearchCriteria());
      dispatch(setSearchFeedback(3));

      setSearchInput('');
      setSearchExact(false);
      setSearchCategories({});
      setSearchTime('');
      setSearchServings('');
    }
  };

  return (
    <form className='d-flex flex-column align-items-center search-form'>
      {/* Text Input */}
      <div className='input-group mb-2'>
        <input
          type='text'
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className='form-control'
          aria-label='Text input with checkbox'
        />
        <div className='input-group-append'>
          <div className='input-group-text'>
            <div className='custom-control custom-switch'>
              <input
                type='checkbox'
                checked={searchExact}
                onChange={() => setSearchExact(prev => !prev)}
                className='custom-control-input'
                id='exact'
              />
              <label className='custom-control-label' htmlFor='exact'>
                Exact
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* Categories */}
      <div className='container row'>
        {categories.map(category => {
          return (
            <div key={category} className='col-6 col-md-4 col-lg-3 pt-1 pb-1'>
              <div className='custom-control custom-switch'>
                <input
                  type='checkbox'
                  checked={!!searchCategories[category]}
                  onChange={() =>
                    setSearchCategories(prev => ({
                      ...prev,
                      [category]: !prev[category]
                    }))
                  }
                  className='custom-control-input'
                  id={category}
                />
                <label className='custom-control-label' htmlFor={category}>
                  {category}
                </label>
              </div>
            </div>
          );
        })}
      </div>
      {/* Select Elements */}
      <div className='container row mt-2 flex-column flex-sm-row'>
        <div className='col'>
          <select
            className='custom-select mt-0'
            value={searchTime}
            onChange={e => setSearchTime(e.target.value)}
          >
            <option value=''>Time</option>
            <option value={`&time[]=0&time[]=15`}>0 - 15 minutes</option>
            <option value={`&time[]=16&time[]=30`}>16 - 30 minutes</option>
            <option value={`&time[]=31&time[]=45`}>31 - 45 minutes</option>
            <option value={`&time[]=46&time[]=60`}>46 - 60 minutes</option>
            <option value={`&time[]=60&time[]=Infinity`}>61+ minutes</option>
          </select>
        </div>
        <div className='col'>
          <select
            className='custom-select mt-0'
            value={searchServings}
            onChange={e => setSearchServings(e.target.value)}
          >
            <option value=''>Servings</option>
            <option value={`&servings[]=1&servings[]=2`}>1 - 2 servings</option>
            <option value={`&servings[]=3&servings[]=4`}>3 - 4 servings</option>
            <option value={`&servings[]=5&servings[]=6`}>5 - 6 servings</option>
            <option value={`&servings[]=7&servings[]=8`}>7 - 8 servings</option>
            <option value={`&servings[]=9&servings[]=Infinity`}>
              9+ servings
            </option>
          </select>
        </div>
      </div>
      {/* Buttons */}
      <div className='d-flex flex-column w-100 mt-3'>
        <button
          className='col-12 btn btn-info btn-block'
          onClick={handleSearch}
        >
          Search
        </button>
        <button className='col-12 btn btn-dark btn-block' onClick={handleClear}>
          Clear
        </button>
      </div>
    </form>
  );
}

SearchForm.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  searchCriteria: PropTypes.shape({
    searchInput: PropTypes.string.isRequired,
    searchExact: PropTypes.bool.isRequired,
    searchCategories: PropTypes.object.isRequired
  }).isRequired,
  searchFeedback: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default React.memo(SearchForm, (prevProps, nextProps) => {
  if (
    prevProps.searchCriteria === nextProps.searchCriteria &&
    prevProps.categories === nextProps.categories
  ) {
    return true;
  } else {
    return false;
  }
});
