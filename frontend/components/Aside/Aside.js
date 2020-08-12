import React from 'react';
import AsideSearch from './AsideSearch';
import AsideTopFive from './AsideTopFive';

function Aside({ topFives, dispatch }) {
  return (
    <div className='col-12 col-lg-3'>
      <aside>
        <AsideSearch dispatch={dispatch} />

        {topFives.map(topFive => (
          <AsideTopFive key={topFive.title} topFive={topFive} dispatch={dispatch} />
        ))}
      </aside>
    </div>
  );
}

export default Aside;
