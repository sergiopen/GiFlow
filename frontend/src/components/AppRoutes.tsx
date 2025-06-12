import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { ProtectedRoute } from "./ProtectedRoute";
import { UploadPage } from "../pages/UploadPage";
import { EditProfilePage } from "../pages/EditProfilePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ProfilePage } from "../pages/ProfilePage";
import { EmbedGif } from "../pages/EmbedGif";
import { GifPage } from "../pages/GifPage";
import { TagPage } from "../pages/TagPage";
import { EditGifPage } from "../pages/EditGifPage";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gif/:id" element={<GifPage />} />
            <Route path="/tag/:tag" element={<TagPage />} />
            <Route path="/embed/gif/:id" element={<EmbedGif />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
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

            <Route path="/edit/:id" element={
                <ProtectedRoute>
                    <EditGifPage />
                </ProtectedRoute>
            } />


            <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Routes>
    );
};