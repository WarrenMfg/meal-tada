import React from 'react';
import { useLocation } from 'react-router-dom';
import SocialShare from './SocialShare';
import ImageScramble from './ImageScramble';
import AsideSearch from './AsideSearch';
import AsideTopFive from './AsideTopFive';
import PropTypes from 'prop-types';

function Aside({ topFives, dispatch }) {
  const { pathname } = useLocation();

  return (
    <div className='col-12 col-lg-3'>
      <aside>
        <AsideSearch dispatch={dispatch} />

        {pathname.startsWith('/recipe/') && (
          <>
            <SocialShare />
            <ImageScramble />
          </>
        )}

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
