import React, { useEffect } from 'react';
import rootReducer from '../reducers/rootReducer';
import { fetchGeneralAndLatestRecipes } from '../api/fetch';

const { Provider, Consumer } = React.createContext();

function GlobalStore({ children }) {
  const combinedState = rootReducer();

  useEffect(() => {
    fetchGeneralAndLatestRecipes(combinedState.dispatch);
  }, []);

  return <Provider value={combinedState}>{children}</Provider>;
}

export { GlobalStore, Consumer };
