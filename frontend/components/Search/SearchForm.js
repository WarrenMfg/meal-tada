import React, { useEffect, useState } from 'react';
import { fetchSearchResults } from '../../api/fetch';
import {
  clearSearchResults,
  setSearchFeedback,
  clearSearchCriteria
} from '../../actions/searchActions';
import PropTypes from 'prop-types';

function SearchForm({ categories, searchCriteria, searchFeedback, dispatch }) {
  const [searchInput, setSearchInput] = useState(searchCriteria.searchInput);
  const [searchExact, setSearchExact] = useState(searchCriteria.searchExact);
  const [searchCategories, setSearchCategories] = useState(
    searchCriteria.searchCategories
  );

  useEffect(() => {
    if (searchFeedback === 2) {
      dispatch(setSearchFeedback(1));
      setSearchInput('');
      setSearchExact(false);
      setSearchCategories({});
    }
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    let categorySelected = false;

    let query = `phrase=${searchInput}&exact=${searchExact}`;
    Object.entries(searchCategories).forEach(tuple => {
      if (tuple[1]) {
        categorySelected = true;
        query += `&categories[]=${tuple[0]}`;
      }
    });

    if (searchInput || categorySelected) {
      const searchCriteria = { searchInput, searchExact, searchCategories };
      dispatch(fetchSearchResults, query, searchCriteria);
    }
  };

  const handleClear = e => {
    e.preventDefault();
    if (
      searchInput ||
      searchExact ||
      Object.values(searchCategories).some(bool => bool)
    ) {
      dispatch(clearSearchResults());
      dispatch(clearSearchCriteria());
      dispatch(setSearchFeedback(3));

      setSearchInput('');
      setSearchExact(false);
      setSearchCategories({});
    }
  };

  return (
    <form className='d-flex flex-column align-items-center search-form'>
      <div className='input-group mb-3'>
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

// export default SearchForm;
