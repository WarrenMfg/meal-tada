import React from 'react';
import pacman from '../images/pacman.gif';
import './styles/Loading.css';

function Loading() {
  return (
    <div className='d-flex justify-content-center align-items-center loading'>
      <img src={pacman} />
    </div>
  );
}

export default Loading;
