import { createContext, useContext, useEffect, useState } from 'react';
import { authApi, clearToken, getToken, setToken } from './api';

const AuthContext = createContext({ user: null, loading: true, signIn: async ()=>{}, signOut: ()=>{} });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) { setLoading(false); return; }
    (async () => {
      try {
        const me = await authApi.me();
        setUser(me);
      } catch { clearToken(); }
      finally { setLoading(false); }
    })();
  }, []);

  const signIn = async (email, password) => {
    const r = await authApi.login(email, password);
    try { const me = await authApi.me(); setUser(me); } catch {}
    return r;
  };

  const signOut = () => { clearToken(); setUser(null); };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }

