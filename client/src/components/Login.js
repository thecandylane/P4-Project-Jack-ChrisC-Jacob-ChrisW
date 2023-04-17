import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}

      {isAuthenticated && (
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
        </button>
      )}
    </div>
  );
};

export default LoginButton;
