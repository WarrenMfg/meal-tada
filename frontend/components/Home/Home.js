import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import KentAndAmy from '../KentAndAmy';
import LatestRecipes from './LatestRecipes';
import Aside from '../Aside';
import hero from '../../images/seasoned-veggies.jpg';
import { fetchGeneralAndLatestRecipes } from '../../api/fetch';
import withGlobalStore from '../../store/withGlobalStore';
import '../styles/Home.css';

function Home({ state }) {
  const { dispatch, general: { introduction, about1 }, recipes: { latestRecipes } } = state;
  useEffect(() => {
    fetchGeneralAndLatestRecipes(dispatch);
  }, []);
  return (
    <div className='container home'>
      <div className='row'>
        <div className='col'>
          <div className='hero rounded' style={{ backgroundImage: `url(${hero})` }} />

          <h1 className='text-center mt-5 mb-5'>Meal Tada</h1>

          <div className='row'>
            <div className='col-12 col-lg-9'>
              <div>
                <p>{introduction}</p>
                <KentAndAmy about1={about1} />
              </div>

              {/* Main */}
              <LatestRecipes latestRecipes={latestRecipes} />

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

export default withGlobalStore(Home);
