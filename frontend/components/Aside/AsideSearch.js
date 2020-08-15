import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { fetchSearchResults } from '../../api/fetch';
import searchIcon from '../../images/magnifier.png';
import PropTypes from 'prop-types';
import '../styles/AsideSearch.css';

function AsideSearch({ dispatch }) {
  const { pathname } = useLocation();
  const { push } = useHistory();
  const [searchInput, setSearchInput] = useState('');

  const handleSetSearchCriteria = e => {
    e.preventDefault();
    let trimmedSearchInput = searchInput.trim();

    if (trimmedSearchInput) {
      const query = `phrase=${searchInput}&exact=true`;
      dispatch(fetchSearchResults, query, {
        searchInput: trimmedSearchInput,
        searchExact: true,
        searchCategories: {},
        searchTime: '',
        searchServings: ''
      });

      push('/search');
    }
  };

  return (
    <>
      {!pathname.includes('search') && (
        <form
          className='d-flex search-container'
          onSubmit={handleSetSearchCriteria}
        >
          <input
            type='text'
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            className='search-input'
            name='search-bar'
            placeholder='Search...'
          />
          <button className='btn btn-light'>
            <img src={searchIcon} />
          </button>
        </form>
      )}
    </>
  );
}

AsideSearch.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default AsideSearch;
