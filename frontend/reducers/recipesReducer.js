export const recipesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_LATEST_RECIPES': {
      return {
        ...state,
        latestRecipes: action.payload
      };
    }
    default:
      return state;
  }
};

export const recipesInitialState = {
  latestRecipes: []
};
