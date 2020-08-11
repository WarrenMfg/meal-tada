export const setInitialRecipes = initialRecipes => ({
  type: 'SET_INITIAL_RECIPES',
  payload: initialRecipes
});

export const setCurrentRecipe = payload => ({
  type: 'SET_CURRENT_RECIPE',
  payload
});
