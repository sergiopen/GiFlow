import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserByUsername } from '../services/userService';
import { Header } from '../components/layout/Header';
import { SliderGifs } from '../components/SliderGifs';
import type { Gif } from '../types/gif.types';
import { ProfilePageSkeleton } from '../components/skeletons/ProfilePageSkeleton';
import { usePageMeta } from '../hooks/usePageMeta';

type User = {
    username: string;
    name?: string;
    bio?: string;
    avatar?: string;
};

export const ProfilePage = () => {
    const { username } = useParams<{ username: string }>();
    const { isAuthenticated, user: authUser } = useAuth();

    const [profileUser, setProfileUser] = useState<User | null>(null);
    const [uploadedGifs, setUploadedGifs] = useState<Gif[]>([]);
    const [likedGifs, setLikedGifs] = useState<Gif[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    usePageMeta({
        title: profileUser?.username ? `Perfil de ${profileUser.username}` : ''
    });

    useEffect(() => {
        if (!username) return;

        setLoading(true);
        setError(null);

        const fetchData = async () => {
            try {
                const data = await getUserByUsername(username);
                const { uploadedGifs = [], likedGifs = [], ...userData } = data;
                setProfileUser(userData.user || userData);
                setUploadedGifs(uploadedGifs);
                setLikedGifs(likedGifs);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message || 'Error al cargar datos');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [username]);

    if (loading) return <ProfilePageSkeleton />
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!profileUser) return null;

    const isOwnProfile = isAuthenticated && authUser?.username === username;

    return (
        <>
            <Header />
            <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4">
                <section className="flex flex-col sm:flex-row sm:items-start sm:gap-6 mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg p-6 text-white">
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left mb-6 sm:mb-0">
                        <img
                            src={profileUser.avatar || '/default-avatar.gif'}
                            alt={`Avatar de ${profileUser.username}`}
                            className="w-32 h-32 m-auto rounded-full object-cover mb-3"
                        />
                        <div className="flex justify-center sm:justify-start gap-8 text-sm text-gray-300">
                            <div>
                                <h2 className="text-2xl font-bold text-white">{uploadedGifs.reduce((acc, gif) => acc + gif.views, 0)}</h2>
                                <p className="text-gray-400 text-sm">Visualizaciones</p>
                            </div>
                            <div className="w-px bg-gray-600 my-1 hidden sm:block" />
                            <div>
                                <h2 className="text-2xl font-bold text-white">{uploadedGifs.length}</h2>
                                <p className="text-gray-400 text-sm">Publicaciones</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-1">{profileUser.name || profileUser.username}</h1>
                        <p className="text-gray-400 mb-2">@{profileUser.username}</p>
                        <p className="text-gray-300">{profileUser.bio || 'Este usuario aún no ha escrito una biografía.'}</p>
                    </div>

                    {isOwnProfile && (
                        <div className="mt-4 sm:mt-0 sm:ml-auto">
                            <Link
                                to="/profile/edit"
                                className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm transition-colors"
                            >
                                Editar perfil
                            </Link>

                        </div>
                    )}
                </section>

                <SliderGifs
                    gifs={uploadedGifs}
                    title="GIFs subidos"
                    emptyText="Este usuario no ha subido ningún GIF todavía."
                />

                <SliderGifs
                    gifs={likedGifs}
                    title="GIFs que le gustan"
                    emptyText="Este usuario no ha dado like a ningún GIF todavía."
                />
            </main>
        </>
    );
};
