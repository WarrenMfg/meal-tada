import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  setMealIdeasFilter,
  clearMealIdeasFilter,
  setMealIdeasFilteredResults
} from '../../actions/adminActions';
import {
  setIsFiltering,
  setIsNotFiltering
} from '../../actions/adminMealIdeasActions';
import './styles/FilterAndSort.css';

function FilterAndSort({ state }) {
  const {
    admin: { adminMealIdeasResults, adminMealIdeasFilter: filter },
    dispatch
  } = state;

  const filterMealIdeas = () => {
    const regexp = RegExp(filter, 'i');
    const filtered = adminMealIdeasResults.filter(result => {
      if (regexp.test(result.idea) || regexp.test(result.notes)) {
        return result;
      }
    });
    dispatch(setMealIdeasFilteredResults(filtered));
    dispatch(setIsNotFiltering());
  };

  const timer = useRef(null);
  useEffect(() => {
    if (!filter) {
      clearTimeout(timer.current);
      dispatch(setMealIdeasFilteredResults([]));
      dispatch(setIsNotFiltering());
      return;
    }

    clearTimeout(timer.current);
    dispatch(setIsFiltering());
    timer.current = setTimeout(() => {
      filterMealIdeas();
    }, 500);

    return () => clearTimeout(timer.current);
  }, [filter]);

  return (
    <div className='input-group mb-2'>
      <input
        type='text'
        className='form-control'
        placeholder='Filter Ideas'
        value={filter}
        onChange={({ target }) => dispatch(setMealIdeasFilter(target.value))}
      />
      <div className='input-group-append'>
        <button
          type='button'
          className='btn btn-dark'
          onClick={() => dispatch(clearMealIdeasFilter())}
        >
          Clear
        </button>

        <button
          type='button'
          className='btn btn-dark dropdown-toggle dropdown-toggle-split'
          data-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded='false'
        >
          <span className='sr-only'>Toggle Dropdown</span>
        </button>

        <div className='dropdown-menu'>
          <span className='dropdown-item'>
            <i className='far fa-caret-square-up'></i> Alpha
          </span>
          <span className='dropdown-item'>
            <i className='far fa-caret-square-down'></i> Alpha
          </span>
          <span className='dropdown-item'>
            <i className='far fa-caret-square-up'></i> Date
          </span>
          <span className='dropdown-item'>
            <i className='far fa-caret-square-down'></i> Date
          </span>
        </div>
      </div>
    </div>
  );
}

FilterAndSort.propTypes = {
  state: PropTypes.object.isRequired
};

export default FilterAndSort;
