import React from 'react';
import AsideSearch from './AsideSearch';
import AsideTopFive from './AsideTopFive';
import PropTypes from 'prop-types';

function Aside({ topFives, dispatch }) {
  return (
    <div className='col-12 col-lg-3'>
      <aside>
        <AsideSearch dispatch={dispatch} />

        {topFives.map(topFive => (
          <AsideTopFive
            key={topFive.title}
            topFive={topFive}
            dispatch={dispatch}
          />
        ))}
      </aside>
    </div>
  );
}

Aside.propTypes = {
  topFives: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default React.memo(Aside, (prevProps, nextProps) => {
  if (prevProps.topFives === nextProps.topFives) {
    return true;
  } else {
    return false;
  }
});
