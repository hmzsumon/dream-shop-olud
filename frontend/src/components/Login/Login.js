import React from 'react';
import Auth from './useAuth';
import './Login.css';
import imgGoogle from '../../images/google.png';

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
    <div className="login-coantainer">
      <div className="login-area">
        <div>
          <img src={imgGoogle} alt="" />
        </div>
        <div>
          {auth.user ? (
            <button className="button primary" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <button className="button primary" onClick={handleSignIn}>
              Sign In With Google
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
