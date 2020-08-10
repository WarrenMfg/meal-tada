import React from 'react';
import Ingredients from './Ingredients';
import Summary from './Summary';
import '../styles/IngredientsAndSummary';

function IngredientsAndSummary({ ingredients, time, summary }) {
  return (
    <section className='mb-4'>
      <h2 className='mb-4'>Ingredients</h2>
      <div className='ingredients-and-summary'>
        <Ingredients ingredients={ingredients} />
        <Summary time={time} summary={summary} />
      </div>
    </section>
  );
}

export default IngredientsAndSummary;
