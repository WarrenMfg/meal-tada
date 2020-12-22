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

export const setActiveRecipe = activeRecipe => ({
  type: 'SET_ACTIVE_RECIPE',
  payload: activeRecipe
});

export const clearActiveRecipe = () => ({
  type: 'CLEAR_ACTIVE_RECIPE'
});
