export const updateFormWithRecipe = state => ({
  type: 'UPDATE_FORM_WITH_RECIPE',
  payload: state
});

export const updateProperty = update => ({
  type: 'UPDATE_PROPERTY',
  payload: update
});

export const clearEditor = () => ({
  type: 'CLEAR_EDITOR'
});
