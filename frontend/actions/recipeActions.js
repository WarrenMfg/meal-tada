export const addInitialRecipes = initialRecipes => ({
  type: 'ADD_INITIAL_RECIPES',
  payload: initialRecipes
});

export const setCurrentRecipe = payload => ({
  type: 'SET_CURRENT_RECIPE',
  payload
});
