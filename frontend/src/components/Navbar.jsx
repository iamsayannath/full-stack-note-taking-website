import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const doLogout = async () => {
    await logout();
    nav('/login');
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-indigo-600">CRED Notes</Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden sm:inline">Hi, <span className="font-semibold">{user.name}</span></span>
              <Link to="/create" className="px-3 py-1 rounded bg-indigo-600 text-white">New Note</Link>
              <button onClick={doLogout} className="px-3 py-1 border rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 rounded border">Login</Link>
              <Link to="/register" className="px-3 py-1 rounded bg-indigo-600 text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
