import React from 'react';
import { Link } from 'react-router-dom';
import AsideTopFive from './AsideTopFive';
import search from '../images/search.png';
import './styles/Aside.css';

function Aside() {
  return (
    <div className='col-12 col-lg-3'>
      <aside>
        <div className='search-container'>
          <input type='text' className='search-input' name='search-bar' placeholder='Search...' />
          <Link className='btn btn-light search-btn' to='/search'>
            <img src={search} />
          </Link>
        </div>

        <AsideTopFive />
        {/* And many more... */}
      </aside>
    </div>
  );
}

export default Aside;
