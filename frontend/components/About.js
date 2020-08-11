import React from 'react';
import { Link } from 'react-router-dom';
import Aside from './Aside';
import kentAndAmy from '../images/kent-and-amy.jpg';
import withGlobalStore from '../store/withGlobalStore';
import './styles/About.css';

function About({ state }) {
  const { about1, about2, topFives } = state.general;

  return (
    <div className='container about'>
      <div className='row'>
        <div className='col'>
          <div className='hero rounded' style={{ backgroundImage: `url(${kentAndAmy})` }} />
          <h1 className='text-center mt-5 mb-5'>About</h1>

          <div className='row'>
            <div className='col-12 col-lg-9'>
              <div>
                {/* Intro paragraph */}
                <p>{about1}</p>
                <img className='img-fluid rounded' src={kentAndAmy} alt='Kent and Amy' />
                <p>{about2}</p>
              </div>

              <Link className='btn btn-info btn-block mt-5 mb-5' to='/recipes'>
                Browse All Recipes
              </Link>
            </div>
            <Aside topFives={topFives} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withGlobalStore(About);
