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

export const updateAdminRecipeSearchResults = newRecipe => ({
  type: 'UPDATE_ADMIN_RECIPE_SEARCH_RESULTS',
  payload: newRecipe
});

export const setRecipeFormErrors = errors => ({
  type: 'SET_RECIPE_FORM_ERRORS',
  payload: errors
});

export const clearRecipeFormErrors = () => ({
  type: 'CLEAR_RECIPE_FORM_ERRORS'
});

export const setAdminIngredientsSearchResults = data => ({
  type: 'SET_ADMIN_INGREDIENTS_SEARCH_RESULTS',
  payload: data
});

export const clearAdminIngredientsSearchResults = () => ({
  type: 'CLEAR_ADMIN_INGREDIENTS_SEARCH_RESULTS'
});

export const updateAdminIngredientsSearchResults = newIngredient => ({
  type: 'UPDATE_ADMIN_INGREDIENTS_SEARCH_RESULTS',
  payload: newIngredient
});

export const clearIngredientFormErrors = () => ({
  type: 'CLEAR_INGREDIENT_FORM_ERRORS'
});

export const setIngredientFormErrors = errors => ({
  type: 'SET_INGREDIENT_FORM_ERRORS',
  payload: errors
});

export const setMealIdeasResults = mealIdeas => ({
  type: 'SET_MEAL_IDEAS_RESULTS',
  payload: mealIdeas
});

export const setMealIdeasFilter = filter => ({
  type: 'SET_MEAL_IDEAS_FILTER',
  payload: filter
});

export const clearMealIdeasFilter = () => ({
  type: 'CLEAR_MEAL_IDEAS_FILTER'
});

export const setMealIdeasFilteredResults = filtered => ({
  type: 'SET_MEAL_IDEAS_FILTERED_RESULTS',
  payload: filtered
});
