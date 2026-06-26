'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type User = {
  id: string;
  name?: string;
  email?: string;
  image?: string;
};

type Session = {
  user: User;
  expires: string;
};

type AuthContextType = {
  session: Session | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  updateSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  const updateSession = async () => {
    try {
      setStatus('loading');
      const res = await fetch('http://localhost:4000/api/auth/session', {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      const data = await res.json();
      
      if (Object.keys(data).length > 0 && data.user) {
        setSession(data);
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

  useEffect(() => {
    updateSession();
  }, []);

  return (
    <AuthContext.Provider value={{ session, status, updateSession }}>
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
