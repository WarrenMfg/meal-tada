export const generalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GENERAL': {
      const { introduction, about1, about2, topFives } = action.payload;
      return {
        ...state,
        introduction,
        about1,
        about2,
        topFives
      };
    }
    default:
      return state;
  }
};

export const generalInitialState = {
  introduction: '',
  about1: '',
  about2: '',
  topFives: []
};
