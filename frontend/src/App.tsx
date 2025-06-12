import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { TagPage } from './pages/TagPage';
import { GifPage } from './pages/GifPage';
import { EmbedGif } from './pages/EmbedGif';
import { ProfilePage } from './pages/ProfilePage';
import { UploadPage } from './pages/UploadPage';
import { EditProfilePage } from './pages/EditProfilePage';
import { SearchResultsPage } from './pages/SearchResultsPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gif/:id" element={<GifPage />} />
          <Route path="/tag/:tag" element={<TagPage />} />
          <Route path="/embed/gif/:id" element={<EmbedGif />} />
          <Route path='/profile/:username' element={<ProfilePage />} />
          <Route path="/search/:term" element={<SearchResultsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />


          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <UploadPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <EditProfilePage />
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
