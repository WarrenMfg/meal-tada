import React from 'react';
import Ingredients from './Ingredients';
import Summary from './Summary';
import PropTypes from 'prop-types';
import '../styles/IngredientsAndSummary.css';

function IngredientsAndSummary({ ingredients, time, servings, summary }) {
  return (
    <section className='mb-4'>
      <h2 className='mb-4'>Ingredients</h2>
      <div className='d-flex ingredients-and-summary'>
        <Ingredients ingredients={ingredients} />
        <Summary time={time} servings={servings} summary={summary} />
      </div>
    </section>
  );
}

IngredientsAndSummary.propTypes = {
  ingredients: PropTypes.array.isRequired,
  time: PropTypes.object.isRequired,
  servings: PropTypes.array.isRequired,
  summary: PropTypes.string.isRequired
};

export default IngredientsAndSummary;
