import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { API_URL } from '../api';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  setIsAuthenticated: (val: boolean) => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const checkAuth = async () => {
    setIsCheckingAuth(true);
    try {
      const res = await fetch(`${API_URL}/admin/auth/me`, {
        credentials: 'include'
      });
      setIsAuthenticated(res.ok);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, isCheckingAuth, checkAuth, setIsAuthenticated }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
