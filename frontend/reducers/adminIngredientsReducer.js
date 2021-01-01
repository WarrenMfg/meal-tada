export const adminIngredientReducer = (state, action) => {
  switch (action.type) {
    case 'CLEAR_ADMIN_INGREDIENT_FORM':
      return {
        ...adminIngredientInitialState
      };
    case 'UPDATE_FORM_WITH_INGREDIENT':
      return {
        ...state,
        ...action.payload
      };
    case 'UPDATE_INGREDIENT_PROPERTY':
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };
    default:
      return state;
  }
};

export const adminIngredientInitialState = {
  ingredient: '',
  notes: ''
  // createdAt and updatedAt are handled on backend
};
