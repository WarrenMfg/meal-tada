import React from 'react';
import { Link } from 'react-router-dom';
import kentAndAmy from '../images/kent-and-amy.jpg';
import './styles/KentAndAmyCard.css';

function KentAndAmy({ about1 }) {
  return (
    <div className='kent-and-amy-container d-flex flex-column align-items-center flex-md-row rounded'>
      <img className='img-fluid rounded-circle mr-3' src={kentAndAmy} />
      <p>
        {about1}
        <Link className='read-more btn btn-info' to='/about'>
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
