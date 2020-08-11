import React from 'react';
import { Link } from 'react-router-dom';
import AsideTopFive from './AsideTopFive';
import searchIcon from '../images/magnifier.png';
import './styles/Aside.css';

function Aside({ topFives, dispatch }) {
  return (
    <div className='col-12 col-lg-3'>
      <aside>
        <div className='search-container'>
          <input type='text' className='search-input' name='search-bar' placeholder='Search...' />
          <Link className='btn btn-light search-btn' to='/search'>
            <img src={searchIcon} />
          </Link>
        </div>

        {topFives.map(topFive => (
          <AsideTopFive key={topFive.title} topFive={topFive} dispatch={dispatch} />
        ))}
      </aside>
    </div>
  );
}

export default Aside;
