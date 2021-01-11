export const setGeneral = payload => ({
  type: 'SET_GENERAL',
  payload
});

export const setImageScrambleURLs = urls => ({
  type: 'SET_IMAGE_SCRAMBLE_URLS',
  payload: urls
});

export const clearImageScrambleURLs = () => ({
  type: 'CLEAR_IMAGE_SCRAMBLE_URLS'
});
