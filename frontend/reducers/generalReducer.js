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
    case 'SET_IMAGE_SCRAMBLE_URLS':
      return {
        ...state,
        imageScrambleURLs: action.payload
      };
    case 'CLEAR_IMAGE_SCRAMBLE_URLS':
      return {
        ...state,
        imageScrambleURLs: []
      };
    case 'UPDATE_IMAGE_SCRAMBLE_URLS':
      return {
        ...state,
        imageScrambleURLs: action.payload
      };
    default:
      return state;
  }
};

export const generalInitialState = {
  introduction: '',
  about1: '',
  about2: '',
  topFives: [],
  imageScrambleURLs: []
};
