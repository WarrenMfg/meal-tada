import React from 'react';
import pacman from '../images/pacman.gif';
import './styles/Loading.css';

function Loading() {
  return (
    <div className='loading'>
      <img src={pacman} />
    </div>
  );
}

export default Loading;
