import { useReducer } from 'react';
import { loadingReducer, loadingInitialState } from './loadingReducer';
import { adminReducer, adminInitialState } from './adminReducer';
import {
  adminIngredientReducer,
  adminIngredientInitialState
} from './adminIngredientsReducer';
import {
  adminEditorReducer,
  adminEditorInitialState
} from './adminEditorReducer';
import {
  adminMealIdeasReducer,
  adminMealIdeasInitialState
} from './adminMealIdeasReducer';

const adminRootReducer = () => {
  const [admin, adminDispatch] = useReducer(adminReducer, adminInitialState);
  const [adminEditor, adminEditorDispatch] = useReducer(
    adminEditorReducer,
    adminEditorInitialState
  );
  const [adminIngredient, adminIngredientDispatch] = useReducer(
    adminIngredientReducer,
    adminIngredientInitialState
  );
  const [adminMealIdeas, adminMealIdeasDispatch] = useReducer(
    adminMealIdeasReducer,
    adminMealIdeasInitialState
  );
  const [loading, loadingDispatch] = useReducer(
    loadingReducer,
    loadingInitialState
  );

  const combinedDispatches = [
    adminDispatch,
    adminEditorDispatch,
    adminIngredientDispatch,
    adminMealIdeasDispatch,
    loadingDispatch
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
    admin,
    adminEditor,
    adminIngredient,
    adminMealIdeas,
    loading,
    dispatch
  };
};

export default adminRootReducer;
