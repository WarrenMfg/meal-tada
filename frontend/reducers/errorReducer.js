export const errorReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return {
        ...state,
        message: action.payload
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        message: null
      };
    default:
      return state;
  }
};

export const errorInitialState = {
  message: null
};
