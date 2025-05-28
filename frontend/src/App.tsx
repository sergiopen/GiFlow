import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadGif from './components/UploadGif';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <UploadGif />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
