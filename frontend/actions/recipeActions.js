export const addLatestRecipes = latestRecipes => ({
  type: 'ADD_LATEST_RECIPES',
  payload: latestRecipes
});

export const setCurrentRecipe = payload => ({
  type: 'SET_CURRENT_RECIPE',
  payload
});
