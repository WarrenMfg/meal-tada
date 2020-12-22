import { useReducer } from 'react';
import { loadingReducer, loadingInitialState } from './loadingReducer';
import { errorReducer, errorInitialState } from './errorReducer';
import { recipesReducer, recipesInitialState } from './recipesReducer';
import { generalReducer, generalInitialState } from './generalReducer';
import { searchReducer, searchInitialState } from './searchReducer';
import { adminReducer, adminInitialState } from './adminReducer';

const rootReducer = () => {
  const [loading, loadingDispatch] = useReducer(
    loadingReducer,
    loadingInitialState
  );
  const [error, errorDispatch] = useReducer(errorReducer, errorInitialState);
  const [recipes, recipesDispatch] = useReducer(
    recipesReducer,
    recipesInitialState
  );
  const [general, generalDispatch] = useReducer(
    generalReducer,
    generalInitialState
  );
  const [search, searchDispatch] = useReducer(
    searchReducer,
    searchInitialState
  );
  const [admin, adminDispatch] = useReducer(adminReducer, adminInitialState);

  const combinedDispatches = [
    loadingDispatch,
    errorDispatch,
    recipesDispatch,
    generalDispatch,
    searchDispatch,
    adminDispatch
  ];

  const dispatchForLoop = action => {
    for (let i = 0; i < combinedDispatches.length; i++) {
      combinedDispatches[i](action);
    }
  };

  // makes fetch use dispatch API
  const dispatch = (action, ...args) => {
    if (typeof action === 'function') {
      // can move combined state above this,
      // and pass in combined state after dispatchForLoop,
      // so functions have access to both dispatch and state
      action(dispatchForLoop, ...args);
    } else {
      dispatchForLoop(action);
    }
  };

  // combined state
  return {
    loading,
    error,
    recipes,
    general,
    search,
    admin,
    dispatch
  };
};

export default rootReducer;
