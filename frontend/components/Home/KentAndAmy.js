import React from 'react';
import kentAndAmy from '../../images/kent-and-amy.jpg';

function KentAndAmy() {
  return (
    <div
      className='d-flex align-items-center'
      style={{ backgroundColor: '#ebebeb', padding: '1.5rem' }}
    >
      <img
        className='img-fluid border rounded-circle d-lg-flex mr-3'
        src={kentAndAmy}
        style={{ width: 200, height: 200 }}
      />
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
  );
}

export default KentAndAmy;
