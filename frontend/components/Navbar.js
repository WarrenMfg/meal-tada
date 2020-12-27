import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const navButton = useRef(null);
  useEffect(() => {
    if (!navButton.current.classList.contains('collapsed')) {
      navButton.current.click();
    }
  });

  const location = useLocation();
  const isActive = pathname => {
    if (pathname === '/' && location.pathname === '/') return ' active';
    else return location.pathname.split('/')[1] === pathname ? ' active' : '';
  };

  const determineReplace = () => {
    if (location.pathname === '/search') return true;
    else return false;
  };

  return (
    <nav className='navbar navbar-light navbar-expand-md navigation-clean sticky-top bg-white shadow-sm'>
      <div className='container pl-sm-3 pr-sm-3 pr-md-2'>
        <Link className='navbar-brand' to='/'>
          Meal Tada
        </Link>
        <button
          ref={navButton}
          data-toggle='collapse'
          className='navbar-toggler collapsed'
          data-target='#navcol-1'
        >
          <span className='sr-only'>Toggle navigation</span>
          <span className='navbar-toggler-icon' />
        </button>
        <div
          className='collapse navbar-collapse justify-content-end'
          id='navcol-1'
        >
          <ul className='nav navbar-nav text-right'>
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
              <Link
                className={`nav-link${isActive('search')}`}
                to='/search'
                replace={determineReplace()}
              >
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
