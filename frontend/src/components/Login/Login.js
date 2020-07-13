import React from 'react';
import Auth from './useAuth';

const Login = () => {
  const auth = Auth();

  //Handle Sign In
  const handleSignIn = () => {
    auth.signInWithGoogle().then((res) => {
      window.location.pathname = '/review';
    });
  };

  //Handle Sign Out
  const handleSignOut = () => {
    auth.signOut().then((res) => {
      window.location.pathname = '/';
    });
  };

  return (
    <div>
      <h1>This is Login</h1>
      {auth.user ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign With Google</button>
      )}
    </div>
  );
};

export default Login;
