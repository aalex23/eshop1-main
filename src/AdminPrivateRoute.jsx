import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);  // Use null to differentiate initial state

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/checkingAuthenticated')
      .then(res => {
        if (res.status === 200) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      })
      .catch(error => {
        console.error('Error checking authentication:', error);
        setAuthenticated(false);  // Set to false if there's an error
      });
  }, []);

  if (authenticated === null) {
    return <div>Loading...</div>;  // Render a loading state while checking authentication
  }

  return authenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
