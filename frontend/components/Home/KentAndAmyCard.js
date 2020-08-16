import React from 'react';
import { Link } from 'react-router-dom';
import Picture from '../Picture';
import PropTypes from 'prop-types';
import '../styles/KentAndAmyCard.css';

function KentAndAmy({ about1 }) {
  return (
    <div className='kent-and-amy-container d-flex flex-column justify-content-center align-items-center flex-md-row rounded'>
      <Picture
        className='d-flex kent-and-amy rounded'
        url='https://meal-tada.s3.amazonaws.com/_general/kent-and-amy'
        width='1000'
        height='1000'
        alt='Kent and Amy'
        title='Kent and Amy'
        loading='eager'
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

KentAndAmy.propTypes = {
  about1: PropTypes.string.isRequired
};

export default React.memo(KentAndAmy, (prevProps, nextProps) => {
  if (prevProps.about1 === nextProps.about1) {
    return true;
  } else {
    return false;
  }
});
