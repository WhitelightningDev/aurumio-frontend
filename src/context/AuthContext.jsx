import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('aurumio.user');
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const login = async ({ email, password, remember, isAdmin }) => {
    // TODO: replace with real auth API
    await new Promise((r) => setTimeout(r, 400));
    const role = isAdmin ? 'admin' : 'user';
    const nextUser = { email, role };
    setUser(nextUser);
    if (remember) {
      try { localStorage.setItem('aurumio.user', JSON.stringify(nextUser)); } catch {}
    }
    return nextUser;
  };

  const logout = () => {
    setUser(null);
    try { localStorage.removeItem('aurumio.user'); } catch {}
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    isAdmin: !!user && user.role === 'admin',
    login,
    logout,
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

