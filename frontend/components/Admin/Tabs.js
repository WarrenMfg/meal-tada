import React from 'react';
import PropTypes from 'prop-types';
import { clearRecipeFormErrors } from '../../actions/adminActions';

export default function Tabs({ dispatch }) {
  return (
    <ul
      className='nav nav-tabs mb-5'
      role='tablist'
      onClick={() => dispatch(clearRecipeFormErrors())}
    >
      <li className='nav-item flex-grow-1' role='presentation' title='Editor'>
        <a
          className='nav-link active text-center'
          role='tab'
          data-toggle='tab'
          href='#tab-1'
        >
          <i className='fas fa-hamburger'></i>
        </a>
      </li>
      <li
        className='nav-item flex-grow-1'
        role='presentation'
        title='Ingredients'
      >
        <a
          className='nav-link text-center'
          role='tab'
          data-toggle='tab'
          href='#tab-2'
        >
          <i className='fas fa-shopping-cart'></i>
        </a>
      </li>
      <li className='nav-item flex-grow-1' role='presentation' title='Ideas'>
        <a
          className='nav-link text-center'
          role='tab'
          data-toggle='tab'
          href='#tab-3'
        >
          <i className='fas fa-lightbulb'></i>
        </a>
      </li>
      <li className='nav-item flex-grow-1' role='presentation' title='Todo'>
        <a
          className='nav-link text-center'
          role='tab'
          // data-toggle='tab'
          href='https://trello.com/b/BKfayBOY/meal-tada'
          target='_blank'
          rel='noreferrer'
        >
          <i className='fas fa-list-alt'></i>
        </a>
      </li>
    </ul>
  );
}

Tabs.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export const tabFour = () => (
  <div className='tab-pane' role='tabpanel' id='tab-4'>
    <button className='btn btn-success btn-block mt-4' type='button'>
      Add New Todo
    </button>
    <div className='search-container'>
      <input
        type='text'
        className='search-input'
        name='search-bar'
        placeholder='Search...'
      />
      <button className='btn btn-light search-btn' type='button'>
        <i className='fa fa-search'></i>
      </button>
    </div>
    <table
      id='example'
      className='table table-striped table-bordered'
      cellSpacing='0'
      width='100%'
    >
      <thead>
        <tr>
          <th>Todo Search Results</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>This is todo number one</td>
        </tr>
        <tr>
          <td>This is todo number two</td>
        </tr>
        <tr>
          <td>This is todo number three</td>
        </tr>
        <tr>
          <td>This is todo number four</td>
        </tr>
        <tr>
          <td>This is todo number five</td>
        </tr>
      </tbody>
    </table>
    <form className='mt-4'>
      <div className='form-group'>
        <label>Idea</label>
        <input className='form-control' type='text' />
      </div>
      <div className='form-group mt-3'>
        <label>Notes</label>
        <textarea className='form-control'></textarea>
      </div>
      <button className='btn btn-primary btn-block mt-5' type='button'>
        Submit
      </button>
    </form>
  </div>
);
