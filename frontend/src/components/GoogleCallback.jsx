import React, { useEffect } from 'react';
import axios from 'axios';

const GoogleCallback = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const code_verifier = localStorage.getItem('pkce_code_verifier');

    if (code && code_verifier) {
      axios.post('http://localhost:3000/api/auth/google/callback', {
        code,
        code_verifier,
      })
      .then(res => {
        // Handle login success (store tokens, redirect, etc.)
      })
      .catch(err => {
        // Handle error
      });
    }
  }, []);

  return <div>Authenticating...</div>;
};

export default GoogleCallback;