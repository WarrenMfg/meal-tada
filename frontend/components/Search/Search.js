import React from 'react';
import Meta from '../Meta';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import Aside from '../Aside/Aside';
import withGlobalStore from '../../store/withGlobalStore';
import PropTypes from 'prop-types';

function Search({ state }) {
  const {
    loading: { isSearching },
    search: { categories, searchCriteria, searchResults, searchFeedback },
    general: { topFives, introduction },
    dispatch
  } = state;

  return (
    <>
      <Meta
        title='Meal Tada'
        description={introduction}
        image='https://meal-tada.s3.amazonaws.com/_general/seasoned-veggies.jpg'
      />
      <div className='container search'>
        <div className='row'>
          <div className='col'>
            <h1 className='text-center mt-5 mb-5'>Search</h1>

            <div className='row'>
              <div className='col-12 col-lg-9'>
                <SearchForm
                  categories={categories}
                  searchCriteria={searchCriteria}
                  searchFeedback={searchFeedback}
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
    </>
  );
}

Search.propTypes = {
  state: PropTypes.shape({
    loading: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
    general: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }).isRequired
};

export default withGlobalStore(Search);
