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
    case 'UPDATE_ADMIN_RECIPE_SEARCH_RESULTS': {
      const updatedAdminRecipeSearchResults = state.adminRecipeSearchResults.map(
        recipe => {
          if (recipe._id === action.payload._id) {
            return action.payload;
          } else {
            return recipe;
          }
        }
      );
      return {
        ...state,
        adminRecipeSearchResults: updatedAdminRecipeSearchResults
      };
    }
    case 'SET_RECIPE_FORM_ERRORS':
      action.payload.forEach(name => {
        document.querySelector(`[name=${name}]`).classList.add('is-invalid');
        window.scrollTo(0, 0);
      });
      return {
        ...state,
        recipeFormErrors: action.payload
      };
    case 'CLEAR_RECIPE_FORM_ERRORS':
      state.recipeFormErrors.forEach(name => {
        document.querySelector(`[name=${name}]`).classList.remove('is-invalid');
      });
      return {
        ...state,
        recipeFormErrors: []
      };
    default:
      return state;
  }
};

export const adminInitialState = {
  adminUser: {},
  adminRecipeSearchResults: [],
  recipeFormErrors: []
};
