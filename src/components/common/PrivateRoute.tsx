import * as React from 'react';
import { Navigate } from 'react-router';

export interface PrivateRouteProps {
  children: React.ReactElement;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));

  return isLoggedIn ? children : <Navigate to="/login" />;
}
