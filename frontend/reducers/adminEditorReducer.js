import { ingredientsToString } from '../utils/adminUtils';

export const adminEditorReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FORM_WITH_RECIPE': {
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
    case 'CLEAR_EDITOR':
      return {
        ...adminEditorInitialState
      };
    default:
      return state;
  }
};

export const adminEditorInitialState = {
  title: '',
  slug: '',
  subtitle: '',
  categories: [], // this is always length 0
  ingredients: '',
  prepTime: '',
  cookTime: '',
  servings: '',
  summary: '',
  directions: '',
  instagram: '',
  isPublished: false
  // createdAt and updatedAt are handled on backend
};
