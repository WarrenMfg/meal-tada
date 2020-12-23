import React, { useEffect, createContext } from 'react';
import useAuth from '../../hooks/useAuth';
import adminRootReducer from '../../reducers/adminRootReducer';
import Tabs from './Tabs';
import RecipeTab from './RecipeTab';

const { Provider } = createContext();

function Admin() {
  const combinedState = adminRootReducer();

  // check if authed (reroutes if not)
  useAuth(combinedState.dispatch);

  // scroll to top on mount
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <Provider value={combinedState}>
      <div className='container'>
        <h1 className='mt-5 text-center'>
          Welcome to the Admin Portal, {combinedState.admin.adminUser.user}
        </h1>
        <div className='row mt-5'>
          <div className='col-12'>
            <main>
              <div>
                <Tabs dispatch={combinedState.dispatch} />
                <div className='tab-content'>
                  <RecipeTab state={combinedState} />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default Admin;
