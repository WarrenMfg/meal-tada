import React from 'react';
import { useHistory } from 'react-router-dom';
import { clearError } from '../actions/errorActions';
import withGlobalStore from '../store/withGlobalStore';
import PropTypes from 'prop-types';
import './styles/ErrorMaskingDiv.css';

function ErrorMaskingDiv({
  state: {
    error: { message },
    dispatch
  }
}) {
  const history = useHistory();

  const handleRefresh = () => {
    // clear error
    dispatch(clearError());
    // reload
    window.location.reload();
  };

  const handleGoBack = () => {
    // clear error
    dispatch(clearError());
    // go back
    history.goBack();
  };

  return (
    <div
      className='error-masking-div'
      style={{ display: `${message ? 'flex' : 'none'}` }}
    >
      <div className='text-center'>
        <h1>Sorry...</h1>
        <h2>An error has occurred 😭</h2>
        <button className='btn btn-info btn-block' onClick={handleRefresh}>
          Refresh
        </button>
        <button className='btn btn-info btn-block' onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </div>
  );
}

ErrorMaskingDiv.propTypes = {
  state: PropTypes.shape({
    error: PropTypes.shape({
      message: PropTypes.any
    }).isRequired,
    dispatch: PropTypes.func.isRequired
  }).isRequired
};

export default withGlobalStore(ErrorMaskingDiv);
