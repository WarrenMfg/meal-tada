export const loadingReducer = (state, action) => {
  switch (action.type) {
    case 'IS_LOADING':
      return {
        ...state,
        isLoading: true
      };
    case 'IS_NOT_LOADING':
      return {
        ...state,
        isLoading: false
      };
    case 'IS_SEARCHING':
      return {
        ...state,
        isSearching: true
      };
    case 'IS_NOT_SEARCHING':
      return {
        ...state,
        isSearching: false
      };
    default:
      return state;
  }
};

export const loadingInitialState = {
  isLoading: true,
  isSearching: false
};
