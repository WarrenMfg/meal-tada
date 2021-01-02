import React, { useEffect, createContext } from 'react';
import { Toaster } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import adminRootReducer from '../../reducers/adminRootReducer';
import Tabs from './Tabs';
import RecipeTab from './RecipeTab';
import IngredientsTab from './IngredientsTab';
import MealIdeas from './MealIdeas';
import pacman from '../../images/pacman.gif';

const { Provider } = createContext();

function Admin() {
  const combinedState = adminRootReducer();

  // check if authed (reroutes if not)
  useAuth(combinedState.dispatch);

  // scroll to top on mount
  useEffect(() => window.scrollTo(0, 0), []);

  // temporary
  useEffect(() => {
    document.querySelector('a[href="#tab-3"]').click();
  }, []);

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
                  <IngredientsTab state={combinedState} />
                  <MealIdeas state={combinedState} />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Toaster
        toastOptions={{
          duration: 4000,
          style: {
            margin: '35px',
            paddingLeft: '1.25em'
          }
        }}
      />
      {/* Loading Masking Div */}
      <div
        className='loading-masking-div'
        style={{
          display: `${combinedState.loading.isLoading ? 'flex' : 'none'}`
        }}
      >
        <img src={pacman} />
      </div>
    </Provider>
  );
}

export default Admin;
