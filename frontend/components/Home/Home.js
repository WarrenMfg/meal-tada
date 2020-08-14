import React from 'react';
import { Link } from 'react-router-dom';
import Meta from '../Meta';
import KentAndAmyCard from './KentAndAmyCard';
import LatestRecipes from './LatestRecipes';
import Aside from '../Aside/Aside';
import hero from '../../images/seasoned-veggies.jpg';
import withGlobalStore from '../../store/withGlobalStore';
import PropTypes from 'prop-types';
import '../styles/Home.css';

function Home({ state }) {
  const {
    dispatch,
    general: { introduction, about1, topFives },
    recipes: { recipes }
  } = state;

  return (
    <>
      <Meta
        title='Meal Tada'
        description={introduction}
        image='https://i.postimg.cc/yYkxqC2F/seasoned-veggies.jpg'
      />
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

                <Link
                  className='btn btn-info btn-block mt-5 mb-5'
                  to='/recipes'
                >
                  Browse All Recipes
                </Link>
              </div>
              <Aside topFives={topFives} dispatch={dispatch} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Home.propTypes = {
  state: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    general: PropTypes.shape({
      introduction: PropTypes.string.isRequired,
      about1: PropTypes.string.isRequired,
      topFives: PropTypes.array.isRequired
    }).isRequired,
    recipes: PropTypes.shape({
      recipes: PropTypes.array.isRequired
    }).isRequired
  })
};

export default withGlobalStore(Home);
