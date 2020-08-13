import React from 'react';
import { Link } from 'react-router-dom';
import KentAndAmyCard from '../KentAndAmyCard';
import LatestRecipes from './LatestRecipes';
import Aside from '../Aside/Aside';
import hero from '../../images/seasoned-veggies.jpg';
import withGlobalStore from '../../store/withGlobalStore';
import '../styles/Home.css';

function Home({ state }) {
  const {
    dispatch,
    general: { introduction, about1, topFives },
    recipes: { recipes }
  } = state;

  return (
    <div className='container home mt-3'>
      <div className='row'>
        <div className='col'>
          <div
            className='hero rounded'
            style={{ backgroundImage: `url(${hero})` }}
          />

          <h1 className='text-center mt-5 mb-5'>Meal Tada</h1>

          <div className='row'>
            <div className='col-12 col-lg-9'>
              <div>
                <p>{introduction}</p>
                <KentAndAmyCard about1={about1} />
              </div>

              {/* Main */}
              <LatestRecipes recipes={recipes} dispatch={dispatch} />

              <Link className='btn btn-info btn-block mt-5 mb-5' to='/recipes'>
                Browse All Recipes
              </Link>
            </div>
            <Aside topFives={topFives} dispatch={dispatch} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withGlobalStore(Home);
