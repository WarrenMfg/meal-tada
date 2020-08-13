import { useReducer } from 'react';
import { loadingReducer, loadingInitialState } from './loadingReducer';
import { errorReducer, errorInitialState } from './errorReducer';
import { recipesReducer, recipesInitialState } from './recipesReducer';
import { generalReducer, generalInitialState } from './generalReducer';
import { searchReducer, searchInitialState } from './searchReducer';

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

  const combinedDispatches = [
    loadingDispatch,
    errorDispatch,
    recipesDispatch,
    generalDispatch,
    searchDispatch
  ];

  const dispatch = action => {
    for (let i = 0; i < combinedDispatches.length; i++) {
      combinedDispatches[i](action);
    }
  };

  // combined state
  return {
    loading,
    error,
    recipes,
    general,
    search,
    dispatch
  };
};

export default rootReducer;
