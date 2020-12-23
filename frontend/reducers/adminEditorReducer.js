import { ingredientsToString } from '../utils/adminUtils';

export const adminEditorReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_STATE': {
      const recipe = action.payload;
      // make type adjustments
      if (Array.isArray(recipe.ingredients))
        recipe.ingredients = ingredientsToString(recipe.ingredients);
      if (Array.isArray(recipe.servings))
        recipe.servings = recipe.servings.join(' to ');
      if (Array.isArray(recipe.directions))
        recipe.directions = recipe.directions.join('\n\n');
      if (typeof recipe.time === 'object') {
        recipe.prepTime = recipe.time.prep;
        recipe.cookTime = recipe.time.cook;
        delete recipe.time;
      }
      return {
        ...state,
        ...recipe
      };
    }
    case 'UPDATE_PROPERTY':
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };
    default:
      return state;
  }
};

export const adminEditorInitialState = {
  title: '',
  slug: '',
  subtitle: '',
  categories: [],
  ingredients: '',
  prepTime: '',
  cookTime: '',
  servings: '',
  summary: '',
  directions: '',
  instagram: '',
  isPublished: false
};
