import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  setMealIdeasFilter,
  clearMealIdeasFilter,
  setMealIdeasFilteredResults,
  setMealIdeasResults
} from '../../actions/adminActions';
import {
  setIsFiltering,
  setIsNotFiltering
} from '../../actions/adminMealIdeasActions';
import './styles/FilterAndSort.css';

function FilterAndSort({ state }) {
  const {
    admin: {
      adminMealIdeasResults,
      adminMealIdeasFilter: filter,
      adminMealIdeasFilteredResults
    },
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
          <span
            className='dropdown-item'
            onClick={() =>
              sort({
                filter,
                adminMealIdeasResults,
                adminMealIdeasFilteredResults,
                direction: 'ascending',
                type: 'alpha',
                dispatch
              })
            }
          >
            <i className='far fa-caret-square-up'></i> Alpha
          </span>
          <span
            className='dropdown-item'
            onClick={() =>
              sort({
                filter,
                adminMealIdeasResults,
                adminMealIdeasFilteredResults,
                direction: 'descending',
                type: 'alpha',
                dispatch
              })
            }
          >
            <i className='far fa-caret-square-down'></i> Alpha
          </span>
          <span
            className='dropdown-item'
            onClick={() =>
              sort({
                filter,
                adminMealIdeasResults,
                adminMealIdeasFilteredResults,
                direction: 'ascending',
                type: 'date',
                dispatch
              })
            }
          >
            <i className='far fa-caret-square-up'></i> Date
          </span>
          <span
            className='dropdown-item'
            onClick={() =>
              sort({
                filter,
                adminMealIdeasResults,
                adminMealIdeasFilteredResults,
                direction: 'descending',
                type: 'date',
                dispatch
              })
            }
          >
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

const sort = ({
  filter,
  adminMealIdeasResults,
  adminMealIdeasFilteredResults,
  direction,
  type,
  dispatch
}) => {
  function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return mergeTwoSortedArrays(left, right);
  }

  function mergeTwoSortedArrays(arrL, arrR) {
    let l = 0;
    let r = 0;
    let result = [];

    if (type === 'alpha') {
      // while both have length, push into result
      while (l < arrL.length && r < arrR.length) {
        if (arrL[l].idea.toLowerCase() <= arrR[r].idea.toLowerCase()) {
          result.push(arrL[l]);
          l++;
        } else {
          result.push(arrR[r]);
          r++;
        }
      }
    } else if (type === 'date') {
      // while both have length, push into result
      while (l < arrL.length && r < arrR.length) {
        if (arrL[l].createdAt <= arrR[r].createdAt) {
          result.push(arrL[l]);
          l++;
        } else {
          result.push(arrR[r]);
          r++;
        }
      }
    }

    // only one of these will run
    while (l < arrL.length) {
      result.push(arrL[l]);
      l++;
    }

    while (r < arrR.length) {
      result.push(arrR[r]);
      r++;
    }

    return result;
  }

  dispatch(setIsFiltering());

  let sorted = filter
    ? mergeSort(adminMealIdeasFilteredResults)
    : mergeSort(adminMealIdeasResults);

  sorted = direction === 'ascending' ? sorted : sorted.reverse();

  filter
    ? dispatch(setMealIdeasFilteredResults(sorted))
    : dispatch(setMealIdeasResults(sorted));

  dispatch(setIsNotFiltering());
};

export default FilterAndSort;
