import React from 'react';
import { Link } from 'react-router-dom';
import KentAndAmy from './KentAndAmy';
import LatestRecipes from './LatestRecipes';
import Aside from './Aside';
import '../styles/Home.css';

function Home() {
  return (
    <div className='container home'>
      <div className='row'>
        <div className='col'>
          <div className='seasoned-veggies rounded' />

          <h1 className='text-center mt-5 mb-5'>Meal Tada</h1>

          <div className='row'>
            <div className='col-12 col-lg-9'>
              <div>
                {/* Intro paragraph */}
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                  esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim
                  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <KentAndAmy />
              </div>
              <LatestRecipes />

              <Link className='btn btn-info btn-block mt-5 mb-5' to='/recipes'>
                Browse All Recipes
              </Link>
            </div>
            <Aside />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
