import React from 'react';
import { Link } from 'react-router-dom';
import kentAndAmy from '../images/kent-and-amy.jpg';
import './styles/KentAndAmyCard.css';

function KentAndAmy({ about1 }) {
  return (
    <div className='kent-and-amy-container d-flex flex-column justify-content-center align-items-center flex-md-row rounded'>
      <div
        className='d-flex kent-and-amy rounded'
        style={{ backgroundImage: `url(${kentAndAmy})` }}
      />
      <p className='d-flex flex-column mb-0'>
        {about1}
        <Link className='btn btn-info btn-block mt-2' to='/about'>
          Read More
        </Link>
      </p>
    </div>
  );
}

export default React.memo(KentAndAmy, (prevProps, nextProps) => {
  if (prevProps.about1 === nextProps.about1) {
    return true;
  } else {
    return false;
  }
});
