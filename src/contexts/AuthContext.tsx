/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  isAdmin: boolean;
  plan: 'free' | 'pro';
  emailsSent: number;
  emailLimit: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: Omit<User, 'isAdmin' | 'plan' | 'emailsSent' | 'emailLimit'>) => void;
  logout: () => void;
  updateEmailsSent: (count: number) => void;
  upgradeToProPlan: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem('gmass_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: Omit<User, 'isAdmin' | 'plan' | 'emailsSent' | 'emailLimit'>) => {
    const newUser: User = {
      ...userData,
      isAdmin: userData.email === 'admin@gmassmailer.com', // Mock admin check
      plan: 'free',
      emailsSent: 0,
      emailLimit: 1000,
    };
    setUser(newUser);
    localStorage.setItem('gmass_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gmass_user');
  };

  const updateEmailsSent = (count: number) => {
    if (user) {
      const updatedUser = { ...user, emailsSent: user.emailsSent + count };
      setUser(updatedUser);
      localStorage.setItem('gmass_user', JSON.stringify(updatedUser));
    }
  };

  const upgradeToProPlan = () => {
    if (user) {
      const updatedUser = { ...user, plan: 'pro' as const, emailLimit: Infinity };
      setUser(updatedUser);
      localStorage.setItem('gmass_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      updateEmailsSent,
      upgradeToProPlan,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};