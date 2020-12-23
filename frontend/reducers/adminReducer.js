export const adminReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ADMIN_USER':
      return {
        ...state,
        adminUser: action.payload
      };
    case 'SET_ADMIN_RECIPE_SEARCH_RESULTS':
      return {
        ...state,
        adminRecipeSearchResults: action.payload
      };
    case 'CLEAR_ADMIN_RECIPE_SEARCH_RESULTS':
      return {
        ...state,
        adminRecipeSearchResults: []
      };
    default:
      return state;
  }
};

export const adminInitialState = {
  adminUser: {},
  adminRecipeSearchResults: []
};
