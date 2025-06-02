import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { registerUser, loginUser, verifyUser, logoutUser } from '../services/authService';

interface User {
  userId: string;
  username: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (formData: { username: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const data = await verifyUser();
        setUser(data);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    verifyAuth();
  }, []);

  const login = async (identifier: string, password: string) => {
    setLoading(true);
    try {
      const data = await loginUser(identifier, password);
      setUser(data);
      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData: { username: string; email: string; password: string }) => {
    setLoading(true);
    try {
      const data = await registerUser(formData);
      setUser(data);
      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutUser().catch((err) => console.error('Logout failed:', err));
    setIsAuthenticated(false);
    setUser(null);
  };

  return <AuthContext.Provider value={{ isAuthenticated, user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
};
