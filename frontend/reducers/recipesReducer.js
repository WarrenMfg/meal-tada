export const recipesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_LATEST_RECIPES':
      return {
        ...state,
        recipes: action.payload
      };
    case 'SET_CURRENT_RECIPE':
      return {
        ...state,
        currentRecipe: action.payload
      };
    default:
      return state;
  }
};

export const recipesInitialState = {
  recipes: [],
  currentRecipe: {}
};
