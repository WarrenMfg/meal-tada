export const adminMealIdeasReducer = (state, action) => {
  switch (action.type) {
    case 'CLEAR_MEAL_IDEA_MODAL':
      return {
        ...state,
        _id: null,
        modalIdea: '',
        modalNotes: '',
        createdAt: null,
        updatedAt: null,
        isLoadingMealIdeas: false
      };
    case 'CLEAR_MEAL_IDEA_FORM_AND_MODAL':
      return {
        ...adminMealIdeasInitialState,
        isLoadingMealIdeas: false
      };
    case 'SET_MODAL_MEAL_IDEA':
      return {
        ...state,
        ...action.payload
      };
    case 'UPDATE_MEAL_IDEA_PROPERTY':
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };
    case 'IS_LOADING_MEAL_IDEAS':
      return {
        ...state,
        isLoadingMealIdeas: true
      };
    case 'IS_NOT_LOADING_MEAL_IDEAS':
      return {
        ...state,
        isLoadingMealIdeas: false
      };
    case 'IS_FILTERING':
      return {
        ...state,
        isFiltering: true
      };
    case 'IS_NOT_FILTERING':
      return {
        ...state,
        isFiltering: false
      };
    default:
      return state;
  }
};

export const adminMealIdeasInitialState = {
  // new idea data
  idea: '',
  notes: '',
  // modal idea data
  _id: null,
  modalIdea: '',
  modalNotes: '',
  createdAt: null,
  updatedAt: null,
  // loader
  isLoadingMealIdeas: true, // useEffect initiates fetch on mount, then toggles to false
  isFiltering: false
};
