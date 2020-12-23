export const initializeState = state => ({
  type: 'INITIALIZE_STATE',
  payload: state
});

export const updateProperty = update => ({
  type: 'UPDATE_PROPERTY',
  payload: update
});
