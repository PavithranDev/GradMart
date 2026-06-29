'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

type User = {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  role?: string;
};

type Session = {
  user: User;
  expires: string;
};

type AuthContextType = {
  session: Session | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  updateSession: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  const updateSession = async () => {
    try {
      setStatus('loading');
      const token = localStorage.getItem('gradmart_token');
      if (!token) {
        setSession(null);
        setStatus('unauthenticated');
        return;
      }
      const res = await fetch(`${API}/api/auth/session`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        localStorage.removeItem('gradmart_token');
        setSession(null);
        setStatus('unauthenticated');
        return;
      }
      const data = await res.json();
      if (data.user) {
        setSession({ user: data.user, expires: '' });
        setStatus('authenticated');
      } else {
        setSession(null);
        setStatus('unauthenticated');
      }
    } catch (error) {
      console.error('Failed to fetch session:', error);
      setSession(null);
      setStatus('unauthenticated');
    }
  };

  const logout = () => {
    localStorage.removeItem('gradmart_token');
    setSession(null);
    setStatus('unauthenticated');
    window.location.href = '/login';
  };

  useEffect(() => {
    updateSession();
  }, []);

  return (
    <AuthContext.Provider value={{ session, status, updateSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSession must be used within an AuthProvider');
  }
  return context;
};
