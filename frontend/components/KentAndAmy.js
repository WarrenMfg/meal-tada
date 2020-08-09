import React from 'react';
import { Link } from 'react-router-dom';
import kentAndAmy from '../images/kent-and-amy.jpg';
import './styles/KentAndAmy.css';

function KentAndAmy() {
  return (
    <div className='kent-and-amy-container d-flex flex-column align-items-center flex-md-row rounded'>
      <img className='img-fluid rounded-circle mr-3' src={kentAndAmy} />
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        <Link className='read-more btn btn-info' to='/about'>
          Read More
        </Link>
      </p>
    </div>
  );
}

export default KentAndAmy;
