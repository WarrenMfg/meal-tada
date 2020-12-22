import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import Tabs from './Tabs';
import RecipeTab from './RecipeTab';
import withGlobalStore from '../../store/withGlobalStore';
import PropTypes from 'prop-types';

function Admin({ state }) {
  const { admin } = state;

  // check if authed (reroutes if not)
  useAuth(state.dispatch);

  // scroll to top on mount
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className='container'>
      <h1 className='mt-5 text-center'>
        Welcome to the Admin Portal, {admin.adminUser.user}
      </h1>
      <div className='row mt-5'>
        <div className='col-12'>
          <main>
            <div>
              <Tabs />
              <div className='tab-content'>
                <RecipeTab state={state} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

Admin.propTypes = {
  state: PropTypes.object.isRequired
};

export default withGlobalStore(Admin);
