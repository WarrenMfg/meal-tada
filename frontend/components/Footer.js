import React from 'react';
import { Link } from 'react-router-dom';
import facebook from '../images/facebook.png';
import instagram from '../images/instagram.png';
import twitter from '../images/twitter.png';
import './styles/Footer.css';

function Footer() {
  return (
    <div className='footer-basic'>
      <footer>
        <div className='social'>
          <Link to='/'>
            <img src={instagram} />
          </Link>
          <Link to='/'>
            <img src={twitter} />
          </Link>
          <Link to='/'>
            <img src={facebook} />
          </Link>
        </div>
        <ul className='list-inline'>
          <li className='list-inline-item'>
            <Link to='/'>Home</Link>
          </li>
          <li className='list-inline-item'>
            <Link to='/recipes'>Recipes</Link>
          </li>
          <li className='list-inline-item'>
            <Link to='/about'>About</Link>
          </li>
          <li className='list-inline-item'>
            <Link to='/search'>Search</Link>
          </li>
          <li className='list-inline-item'>
            <Link to='/'>Privacy Policy</Link>
          </li>
        </ul>
        <p className='copyright'>Meal Tada &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default Footer;
