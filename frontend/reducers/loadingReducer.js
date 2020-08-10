export const loadingReducer = (state, action) => {
  switch (action.type) {
    case 'IS_LOADING':
      return {
        ...state,
        loading: true
      };
    case 'IS_NOT_LOADING':
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export const loadingInitialState = {
  loading: false
};
