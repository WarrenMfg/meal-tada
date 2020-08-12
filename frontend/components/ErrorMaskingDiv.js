import React from 'react';
import { useHistory } from 'react-router-dom';
import withGlobalStore from '../store/withGlobalStore';
import './styles/ErrorMaskingDiv.css';

function ErrorMaskingDiv({ state: { error: { message } } }) {
  const history = useHistory();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className='error-masking-div' style={{ display: `${message ? 'flex' : 'none'}` }}>
      <div className='text-center'>
        <h1>Sorry...</h1>
        <h2>An error has occurred 🥺</h2>
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

export default withGlobalStore(ErrorMaskingDiv);
