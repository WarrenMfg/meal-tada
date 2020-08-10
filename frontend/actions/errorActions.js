export const addError = error => ({
  type: 'ADD_ERROR',
  payload: error
});

export const clearError = () => ({
  type: 'CLEAR_ERROR'
});
