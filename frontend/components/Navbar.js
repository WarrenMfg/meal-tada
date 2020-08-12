import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const isActive = pathname => {
    if (pathname === '/' && location.pathname === '/') return ' active';
    else return location.pathname.split('/')[1] === pathname ? ' active' : '';
  };

  return (
    <nav className='navbar navbar-light navbar-expand-md navigation-clean sticky-top bg-white shadow-sm'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          Meal Tada
        </Link>
        <button data-toggle='collapse' className='navbar-toggler' data-target='#navcol-1'>
          <span className='sr-only'>Toggle navigation</span>
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navcol-1'>
          <ul className='nav navbar-nav ml-auto'>
            <li className='nav-item' role='presentation'>
              <Link className={`nav-link${isActive('/')}`} to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item' role='presentation'>
              <Link className={`nav-link${isActive('recipes')}`} to='/recipes'>
                Recipes
              </Link>
            </li>
            <li className='nav-item' role='presentation'>
              <Link className={`nav-link${isActive('about')}`} to='/about'>
                About
              </Link>
            </li>
            <li className='nav-item' role='presentation'>
              <Link className={`nav-link${isActive('search')}`} to='/search'>
                Search
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
