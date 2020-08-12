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
    case 'IS_FETCHING_MORE_RECIPES':
      return {
        ...state,
        isFetchingMoreRecipes: true
      };
    case 'IS_NOT_FETCHING_MORE_RECIPES':
      return {
        ...state,
        isFetchingMoreRecipes: false
      };
    default:
      return state;
  }
};

export const loadingInitialState = {
  isLoading: true,
  isSearching: false,
  isFetchingMoreRecipes: false
};
