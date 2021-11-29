import { LoginPayload, User } from 'models';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user?: User;
  token?: string;
  login: (value: LoginPayload) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>();

  const [token, setToken] = useState<string | undefined>(() => {
    return localStorage.getItem('access_token') || undefined;
  });

  const navigate = useNavigate();

  const login = (value: LoginPayload) => {
    console.log('Login with: ', value);
    setUser({ id: value.username, name: value.username });
    setToken('auth');
    localStorage.setItem('access_token', 'auth');
    navigate('/admin');
  };

  const logout = () => {
    console.log('Logout');
    setUser(undefined);
    setToken(undefined);
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  const values = { user, login, logout, token };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
