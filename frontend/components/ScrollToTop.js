import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  const { action } = useHistory();
  let timeoutID;

  let scrollY = 0;
  window.onscroll = () => (scrollY = window.scrollY);

  useEffect(() => {
    // if navigating to page by clicking on a link
    if (action === 'PUSH') {
      // start at top of page
      window.scrollTo(0, 0);
      // otherwise, see if scroll position was previously saved during unmount (see below)
    } else {
      const scrollPositions =
        JSON.parse(sessionStorage.getItem('scrollPositions')) || {};

      let name = pathname.split('/').filter(p => p);
      // if recipes/:name
      if (name.length > 1) {
        // name = :name
        name = name[1];
        // otherwise, name = pathname, or if '/' then name = 'home'
      } else {
        name = name[0] ?? 'home';
      }

      // if present, scroll to position
      if (Object.prototype.hasOwnProperty.call(scrollPositions, name)) {
        window.scrollTo(0, scrollPositions[name]);
        // otherwise start at top of page
      } else {
        window.scrollTo(0, 0);
      }
    }

    // capture scroll position before unmount
    return () => {
      const scrollPositions =
        JSON.parse(sessionStorage.getItem('scrollPositions')) || {};

      let name = pathname.split('/').filter(p => p);
      // if recipes/:name
      if (name.length > 1) {
        // name = :name
        name = name[1];
        // otherwise, name = pathname, or if '/' then name = 'home'
      } else {
        name = name[0] ?? 'home';
      }

      // update scroll position and save to sessionStorage
      scrollPositions[name] = scrollY;
      sessionStorage.setItem(
        'scrollPositions',
        JSON.stringify(scrollPositions)
      );
      clearTimeout(timeoutID);
    };
  }, [pathname]);

  return null;
}

export default ScrollToTop;
