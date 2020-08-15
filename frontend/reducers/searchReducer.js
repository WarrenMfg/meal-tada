export const searchReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload
      };
    case 'SET_SEARCH_CRITERIA':
      return {
        ...state,
        searchCriteria: action.payload
      };
    case 'CLEAR_SEARCH_CRITERIA':
      return {
        ...state,
        searchCriteria: {
          searchInput: '',
          searchExact: false,
          searchCategories: {},
          searchTime: '',
          searchServings: ''
        }
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
    case 'SET_SEARCH_FEEDBACK':
      return {
        ...state,
        searchFeedback: action.payload
      };
    default:
      return state;
  }
};

export const searchInitialState = {
  categories: [],
  searchCriteria: {
    searchInput: '',
    searchExact: false,
    searchCategories: {},
    searchTime: '',
    searchServings: ''
  },
  searchResults: [],
  searchFeedback: 1
};
