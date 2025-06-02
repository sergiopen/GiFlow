import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="w-full sticky top-0 z-50 px-6 py-4 text-white bg-zinc-900 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        GifApp
      </Link>

      <nav className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Link to={`/profile/${user?.username}`}>
              <div className="flex items-center gap-2 hover:underline">
                <img
                  src={user?.avatar || '/default-avatar.gif'}
                  alt={`${user?.username} foto de perfil`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="hover:underline">{user?.username}</p>
              </div>
            </Link>
            <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer">
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Iniciar sesión
            </Link>
            <Link to="/register" className="hover:underline">
              Registro
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
