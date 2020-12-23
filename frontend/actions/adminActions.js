export const setAdminUser = adminUser => ({
  type: 'SET_ADMIN_USER',
  payload: adminUser
});

export const setAdminRecipeSearchResults = data => ({
  type: 'SET_ADMIN_RECIPE_SEARCH_RESULTS',
  payload: data
});

export const clearAdminRecipeSearchResults = () => ({
  type: 'CLEAR_ADMIN_RECIPE_SEARCH_RESULTS'
});

export const setRecipeFormErrors = errors => ({
  type: 'SET_RECIPE_FORM_ERRORS',
  payload: errors
});

export const clearRecipeFormErrors = () => ({
  type: 'CLEAR_RECIPE_FORM_ERRORS'
});
