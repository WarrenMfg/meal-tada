export const clearMealIdeaModal = () => ({
  type: 'CLEAR_MEAL_IDEA_MODAL'
});

export const clearMealIdeaFormAndModal = () => ({
  type: 'CLEAR_MEAL_IDEA_FORM_AND_MODAL'
});

export const setModalMealIdea = modalData => ({
  type: 'SET_MODAL_MEAL_IDEA',
  payload: modalData
});

export const updateMealIdeaProperty = data => ({
  type: 'UPDATE_MEAL_IDEA_PROPERTY',
  payload: data
});

export const isLoadingMealIdeas = () => ({
  type: 'IS_LOADING_MEAL_IDEAS'
});

export const isNotLoadingMealIdeas = () => ({
  type: 'IS_NOT_LOADING_MEAL_IDEAS'
});

export const setIsFiltering = () => ({
  type: 'IS_FILTERING'
});

export const setIsNotFiltering = () => ({
  type: 'IS_NOT_FILTERING'
});
