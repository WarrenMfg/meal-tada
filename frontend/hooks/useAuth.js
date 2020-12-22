import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { parseAndHandleErrors } from '../utils/utils';
import jwtDecode from 'jwt-decode';
import { setAdminUser } from '../actions/adminActions';
import { isNotLoading } from '../actions/loadingActions';

export default function useAuth(dispatch) {
  const jwt = localStorage.getItem('admin');
  const history = useHistory();

  useEffect(() => {
    // if no admin jwt
    if (!jwt) {
      const credentials = prompt('Enter your credentials.');
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
          localStorage.setItem('admin', data.token);
          const adminUser = jwtDecode(data.token.split(' ')[1]);
          dispatch(setAdminUser(adminUser));
          dispatch(isNotLoading());
        })
        .catch(() => {
          localStorage.removeItem('admin');
          history.replace('/');
        });

      // if admin jwt, check if expired
    } else {
      try {
        const adminUser = jwtDecode(jwt.split(' ')[1]);
        if (Math.ceil(Date.now() / 1000) >= adminUser.exp) {
          localStorage.removeItem('admin');
          history.replace('/');
        } else {
          dispatch(setAdminUser(adminUser));
          dispatch(isNotLoading());
        }
      } catch {
        localStorage.removeItem('admin');
        history.replace('/');
      }
    }
  }, []);
}
