import { useEffect } from 'react';
import { parseAndHandleErrors } from '../utils/utils';
import jwtDecode from 'jwt-decode';
import { setAdminUser } from '../actions/adminActions';
import { isNotLoading } from '../actions/loadingActions';

export default function useAuth(dispatch, history) {
  const jwt = sessionStorage.getItem('admin');

  useEffect(() => {
    // if no admin jwt
    if (!jwt) {
      const credentials = prompt('Enter your credentials.');
      if (credentials) {
        fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            credentials
          })
        })
          .then(parseAndHandleErrors)
          .then(data => {
            sessionStorage.setItem('admin', data.token);
            const adminUser = jwtDecode(data.token.split(' ')[1]);
            dispatch(setAdminUser(adminUser));
            dispatch(isNotLoading());
          })
          .catch(() => {
            // if '/api/login' returns 401
            history.push('/');
          });
      } else {
        history.push('/');
      }

      // if admin jwt, check if expired
    } else {
      try {
        const adminUser = jwtDecode(jwt.split(' ')[1]);
        if (Math.ceil(Date.now() / 1000) >= adminUser.exp) {
          sessionStorage.removeItem('admin');
          window.location.reload();
        } else {
          // for refreshes
          dispatch(setAdminUser(adminUser));
          dispatch(isNotLoading());
        }
      } catch {
        sessionStorage.removeItem('admin');
        history.push('/');
      }
    }
  }, []);
}
