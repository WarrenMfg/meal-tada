export const generalReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_INTRO_AND_ABOUT': {
      const { introduction, about1, about2 } = action.payload;
      return {
        ...state,
        introduction,
        about1,
        about2
      };
    }
    default:
      return state;
  }
};

export const generalInitialState = {
  introduction: '',
  about1: '',
  about2: ''
};
