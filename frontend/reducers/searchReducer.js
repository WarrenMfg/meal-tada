export const searchReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload
      };
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: action.payload
      };
    case 'CLEAR_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: []
      };
    default:
      return state;
  }
};

export const searchInitialState = {
  categories: [],
  searchResults: []
};
