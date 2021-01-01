export const clearAdminIngredientForm = () => ({
  type: 'CLEAR_ADMIN_INGREDIENT_FORM'
});

export const updateFormWithIngredient = data => ({
  type: 'UPDATE_FORM_WITH_INGREDIENT',
  payload: data
});

export const updateIngredientProperty = update => ({
  type: 'UPDATE_INGREDIENT_PROPERTY',
  payload: update
});
