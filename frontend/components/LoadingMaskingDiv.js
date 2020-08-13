import React from 'react';
import pacman from '../images/pacman.gif';
import withGlobalStore from '../store/withGlobalStore';
import PropTypes from 'prop-types';
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

LoadingMaskingDiv.propTypes = {
  state: PropTypes.shape({
    loading: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired
    }).isRequired
  }).isRequired
};

export default withGlobalStore(LoadingMaskingDiv);
