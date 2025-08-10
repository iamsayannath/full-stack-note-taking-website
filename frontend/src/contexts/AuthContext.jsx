import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await authAPI.me();
      setUser(res.user);
    } catch (err) {
      console.log(err);

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const login = async (payload) => {
    const res = await authAPI.login(payload);
    setUser(res.user);
    return res;
  };

  const register = async (payload) => {
    const res = await authAPI.register(payload);
    setUser(res.user);
    return res;
  };

  const logout = async () => {
    await authAPI.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, reload: load }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
