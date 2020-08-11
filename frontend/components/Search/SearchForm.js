import React, { useEffect, useState } from 'react';
import { fetchSearchResults } from '../../api/fetch';

function SearchForm({ categories, dispatch }) {
  const [ searchInput, setSearchInput ] = useState('');
  const [ searchExact, setSearchExact ] = useState(false);
  const [ searchCategories, setSearchCategories ] = useState({});

  useEffect(() => {
    return () => {
      setSearchInput('');
      setSearchCategories([]);
    };
  }, []);

  const handleSearch = e => {
    e.preventDefault();

    let query = `phrase=${searchInput}&exact=${searchExact}`;
    Object.entries(searchCategories).forEach(tuple => {
      if (tuple[1]) {
        query += `&categories[]=${tuple[0]}`;
      }
    });

    fetchSearchResults(dispatch, query);
  };

  return (
    <form className='d-flex flex-column align-items-center search-form' onSubmit={handleSearch}>
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
                value={searchExact}
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
                  value={!!searchCategories[category]}
                  onChange={() =>
                    setSearchCategories(prev => ({ ...prev, [category]: !prev[category] }))}
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
      <div className='w-100'>
        <button className='btn btn-info btn-block mt-3 mb-4'>Search</button>
      </div>
    </form>
  );
}

export default SearchForm;
