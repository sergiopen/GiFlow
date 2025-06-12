import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserByUsername, updateUserProfile } from '../services/userService';
import { useAuth } from '../contexts/AuthContext';
import { Header } from '../components/layout/Header';
import { usePageMeta } from '../hooks/usePageMeta';

export const EditProfilePage = () => {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { user, refreshUser } = useAuth();

    usePageMeta({ title: "Editar Perfil" });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const fetched = await getUserByUsername(user?.username as string);
                setUsername(fetched.user.username || '');
                setBio(fetched.user.bio || '');
            } catch {
                setMessage('Error cargando datos del perfil');
            } finally {
                setLoading(false);
            }
        };
        if (user?.username) fetchProfile();
    }, [user?.username]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('bio', bio);
            if (avatarFile) formData.append('avatar', avatarFile);

            await updateUserProfile(user?.userId as string, formData);

            setMessage('Perfil actualizado correctamente');
            await refreshUser();
            setTimeout(() => navigate(`/profile/${username}`), 1500);
        } catch {
            setMessage('Error actualizando perfil');
        }
    };

    if (loading) return <p className="text-center text-white">Cargando...</p>;

    return (
        <>
            <Header />
            <main className='p-4'>
                <form
                    onSubmit={handleSubmit}
                    className="max-w-lg mx-auto p-6 bg-zinc-900 rounded-2xl shadow-lg space-y-6 text-white"
                >
                    <h2 className="text-2xl font-semibold text-center">Editar perfil</h2>

                    <label className="block">
                        <span className="text-sm text-gray-300">Nombre de usuario</span>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full mt-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm text-gray-300">Biografía</span>
                        <textarea
                            value={bio}
                            onChange={e => setBio(e.target.value)}
                            className="w-full mt-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white resize-none h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm text-gray-300">Imagen de avatar</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => setAvatarFile(e.target.files?.[0] || null)}
                            className="m-2 text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                        />
                    </label>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
                    >
                        Guardar cambios
                    </button>

                    {message && <p className="text-center text-indigo-400">{message}</p>}
                </form>
            </main>
        </>
    );
};
