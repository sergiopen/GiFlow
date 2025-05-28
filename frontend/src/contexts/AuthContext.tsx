import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { registerUser, loginUser, verifyUser, logoutUser } from '../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
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
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const data = await verifyUser();
        setUsername(data.username);
        setIsAuthenticated(true);
      } catch {
        setUsername(null);
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
      setUsername(data.username);
      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
      setUsername(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData: { username: string; email: string; password: string }) => {
    setLoading(true);
    try {
      const data = await registerUser(formData);
      setUsername(data.username);
      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
      setUsername(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutUser().catch((err) => console.error('Logout failed:', err));
    setIsAuthenticated(false);
    setUsername(null);
  };

  return <AuthContext.Provider value={{ isAuthenticated, username, loading, login, register, logout }}>{children}</AuthContext.Provider>;
};
