import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import rootReducer from '../reducers/rootReducer';
import { fetchInit } from '../api/fetch';
import PropTypes from 'prop-types';

const { Provider, Consumer } = React.createContext();

function GlobalStore({ children }) {
  const combinedState = rootReducer();
  const location = useLocation();

  useEffect(() => {
    // on load, Recipe component makes own fetch request
    if (!location.pathname.includes('recipe/')) {
      fetchInit(combinedState.dispatch);
    }
  }, []);

  return <Provider value={combinedState}>{children}</Provider>;
}

GlobalStore.propTypes = {
  children: PropTypes.object.isRequired
};

export { GlobalStore, Consumer };
