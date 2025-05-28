import { useState } from 'react';
import { AxiosError } from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '../components/layout/Header';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) return <Navigate to="/" />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(identifier, password);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-6">
          <h2 className="text-2xl mb-4">Inicio de sesión</h2>
          <input
            type="text"
            placeholder="Email ó usuario"
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mb-3 p-2 border rounded"
          />
          {error && <p className="text-red-600 mb-3">{error}</p>}
          <button type="submit" className="w-full mb-3 p-2 border rounded">
            Login
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
