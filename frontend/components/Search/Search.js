import React from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import Aside from '../Aside/Aside';
import withGlobalStore from '../../store/withGlobalStore';

function Search({ state }) {
  const {
    loading: { isSearching },
    search: { categories, searchCriteria, searchResults, searchFeedback },
    general: { topFives },
    dispatch
  } = state;

  return (
    <div className='container search'>
      <div className='row'>
        <div className='col'>
          <h1 className='text-center mt-5 mb-5'>Search</h1>

          <div className='row'>
            <div className='col-12 col-lg-9'>
              <SearchForm
                categories={categories}
                searchCriteria={searchCriteria}
                dispatch={dispatch}
              />
              <SearchResults
                isSearching={isSearching}
                searchResults={searchResults}
                searchFeedback={searchFeedback}
                dispatch={dispatch}
              />
            </div>
            <Aside topFives={topFives} dispatch={dispatch} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withGlobalStore(Search);
