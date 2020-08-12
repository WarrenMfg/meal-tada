export const setInitialRecipes = initialRecipes => ({
  type: 'SET_INITIAL_RECIPES',
  payload: initialRecipes
});

export const setCurrentRecipe = recipe => ({
  type: 'SET_CURRENT_RECIPE',
  payload: recipe
});

export const addMoreRecipes = recipes => ({
  type: 'ADD_MORE_RECIPES',
  payload: recipes
});
