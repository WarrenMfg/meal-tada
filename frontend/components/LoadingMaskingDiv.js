import React from 'react';
import pacman from '../images/pacman.gif';
import withGlobalStore from '../store/withGlobalStore';
import './styles/LoadingMaskingDiv.css';

function LoadingMaskingDiv({
  state: {
    loading: { isLoading }
  }
}) {
  return (
    <div
      className='loading-masking-div'
      style={{ display: `${isLoading ? 'flex' : 'none'}` }}
    >
      <img src={pacman} />
    </div>
  );
}

export default withGlobalStore(LoadingMaskingDiv);
