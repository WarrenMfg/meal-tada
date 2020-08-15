import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateMeta } from '../utils/utils';
import Aside from './Aside/Aside';
import withGlobalStore from '../store/withGlobalStore';
import PropTypes from 'prop-types';
import './styles/About.css';

function About({ state }) {
  const { introduction, about1, about2, topFives } = state.general;
  const { dispatch } = state;

  useEffect(() => {
    if (introduction) {
      updateMeta({
        title: 'Meal Tada',
        description: introduction,
        image:
          'https://meal-tada.s3.amazonaws.com/_general/seasoned-veggies.jpg'
      });
    }
  }, [introduction]);

  return (
    <div className='container about mt-3'>
      <div className='row'>
        <div className='col'>
          <div className='hero rounded' />
          <h1 className='text-center mt-5 mb-5'>About</h1>

          <div className='row'>
            <div className='col-12 col-lg-9'>
              <div>
                <p>{about1}</p>
                <img
                  className='img-fluid rounded w-100'
                  src='https://meal-tada.s3.amazonaws.com/_general/kent-and-amy.jpg'
                  alt='Kent and Amy'
                />
                <p>{about2}</p>
              </div>

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

About.propTypes = {
  state: PropTypes.shape({
    general: PropTypes.shape({
      introduction: PropTypes.string.isRequired,
      about1: PropTypes.string.isRequired,
      about2: PropTypes.string.isRequired,
      topFives: PropTypes.array.isRequired
    }).isRequired,
    dispatch: PropTypes.func.isRequired
  }).isRequired
};

const memoized = React.memo(About, (prevProps, nextProps) => {
  if (prevProps.state.general === nextProps.state.general) {
    return true;
  } else {
    return false;
  }
});

export default withGlobalStore(memoized);
