import React, { useEffect, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import adminRootReducer from '../../reducers/adminRootReducer';
import Tabs from './Tabs';
import RecipeTab from './RecipeTab';
import IngredientsTab from './IngredientsTab';
import MealIdeas from './MealIdeas';
import pacman from '../../images/pacman.gif';
import './styles/Admin.css';

const { Provider } = createContext();

function Admin() {
  const combinedState = adminRootReducer();
  const history = useHistory();

  // check if authed (reroutes if not)
  useAuth(combinedState.dispatch, history);

  // scroll to top on mount
  useEffect(() => window.scrollTo(0, 0), []);

  const handleLogout = e => {
    if (confirm('Are you sure you want to logout?')) {
      sessionStorage.removeItem('admin');
      history.push('/');
    }
    e.stopPropagation();
  };

  return (
    <Provider value={combinedState}>
      <div className='container'>
        <div className='mt-5 position-relative'>
          <h1 className='text-center'>
            Welcome, {combinedState.admin.adminUser.user}!
          </h1>
          <button className='btn btn-dark logout' onClick={handleLogout}>
            Logout
          </button>
        </div>
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
