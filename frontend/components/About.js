import React from 'react';
import { Link } from 'react-router-dom';
import Aside from './Aside';
import kentAndAmy from '../images/kent-and-amy.jpg';
import './styles/About.css';

function About() {
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
                <img className='img-fluid rounded' src={kentAndAmy} alt='Kent and Amy' />
                <p>
                  Turpis cursus in hac habitasse platea dictumst quisque sagittis purus. At
                  imperdiet dui accumsan sit amet. Bibendum est ultricies integer quis auctor. Massa
                  eget egestas purus viverra accumsan in nisl nisi scelerisque. Lobortis scelerisque
                  fermentum dui faucibus in ornare. Est pellentesque elit ullamcorper dignissim
                  cras. Sollicitudin ac orci phasellus egestas tellus rutrum tellus. Enim ut sem
                  viverra aliquet eget. Phasellus faucibus scelerisque eleifend donec pretium
                  vulputate sapien nec.
                </p>
              </div>

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

export default About;
