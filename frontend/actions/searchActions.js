export const setCategories = categories => ({
  type: 'SET_CATEGORIES',
  payload: categories
});

export const setSearchCriteria = searchCriteria => ({
  type: 'SET_SEARCH_CRITERIA',
  payload: searchCriteria
});

export const clearSearchCriteria = () => ({
  type: 'CLEAR_SEARCH_CRITERIA'
});

export const setSearchResults = searchResults => ({
  type: 'SET_SEARCH_RESULTS',
  payload: searchResults
});

export const clearSearchResults = () => ({
  type: 'CLEAR_SEARCH_RESULTS'
});

export const setSearchFeedback = feedback => ({
  type: 'SET_SEARCH_FEEDBACK',
  payload: feedback
});
