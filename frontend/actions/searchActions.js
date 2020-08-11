export const setCategories = categories => ({
  type: 'SET_CATEGORIES',
  payload: categories
});

export const setSearchResults = searchResults => ({
  type: 'SET_SEARCH_RESULTS',
  payload: searchResults
});

export const clearSearchResults = () => ({
  type: 'CLEAR_SEARCH_RESULTS'
});
