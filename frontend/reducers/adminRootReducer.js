import { useReducer } from 'react';
import { loadingReducer, loadingInitialState } from './loadingReducer';
import { adminReducer, adminInitialState } from './adminReducer';
import {
  adminEditorReducer,
  adminEditorInitialState
} from './adminEditorReducer';

const adminRootReducer = () => {
  const [admin, adminDispatch] = useReducer(adminReducer, adminInitialState);
  const [adminEditor, adminEditorDispatch] = useReducer(
    adminEditorReducer,
    adminEditorInitialState
  );
  const [loading, loadingDispatch] = useReducer(
    loadingReducer,
    loadingInitialState
  );

  const combinedDispatches = [
    adminDispatch,
    adminEditorDispatch,
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
    loading,
    dispatch
  };
};

export default adminRootReducer;
