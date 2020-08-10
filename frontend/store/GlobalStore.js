import React from 'react';
import rootReducer from '../reducers/rootReducer';
// import { fetchPhotos } from '../api/fetch';

const { Provider, Consumer } = React.createContext();

function GlobalStore({ children }) {
  const combinedState = rootReducer();

  // useEffect(() => {
  //   fetchPhotos(dispatch);
  // }, []);

  return <Provider value={combinedState}>{children}</Provider>;
}

export { GlobalStore, Consumer };
