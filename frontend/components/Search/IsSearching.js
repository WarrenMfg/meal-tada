import React from 'react';
import pacman from '../../images/pacman.gif';
import '../styles/IsSearching.css';

function IsSearching() {
  return (
    <div className='is-searching'>
      <img src={pacman} />
    </div>
  );
}

export default IsSearching;
