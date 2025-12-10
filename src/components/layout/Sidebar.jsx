import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import clsx from 'clsx';
import { LogOut } from 'lucide-react'; // Keeping Lucide for logout if needed, or switch to material

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const isActive = (path) => location.pathname.startsWith(path);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const menuItems = [
        { icon: 'dashboard', label: 'Inicio', path: '/dashboard' },
        { icon: 'inventory_2', label: 'Marketing', path: '/marketing' },
        { icon: 'table_chart', label: 'Precios', path: '/precios' },
        { icon: 'description', label: 'Contratos', path: '/contratos' },
        { icon: 'campaign', label: 'Noticias', path: '/noticias' },
    ];

    return (
        <aside className="hidden md:flex flex-col w-64 h-full bg-white dark:bg-[#1a2e26] border-r border-gray-100 dark:border-gray-800 flex-shrink-0 transition-colors duration-200">
            <div className="flex flex-col h-full justify-between p-4">
                <div className="flex flex-col gap-6">
                    {/* Brand */}
                    {/* Brand */}
                    <div className="flex flex-col items-center gap-2 mb-2 px-2">
                        <img
                            src="/logo.png"
                            alt="Origen Botánico"
                            className="w-full max-w-[140px] h-auto object-contain"
                        />
                        {/* Optional subtitle if needed, but logo has text */}
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-col gap-2">
                        {menuItems.map((item) => {
                            const active = isActive(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={clsx(
                                        'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors',
                                        active
                                            ? 'bg-primary/10 text-primary dark:text-primary font-medium'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 group'
                                    )}
                                >
                                    <span className={clsx(
                                        "material-symbols-outlined",
                                        !active && "group-hover:text-primary transition-colors"
                                    )}>
                                        {item.icon}
                                    </span>
                                    <span className="text-sm">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Links */}
                <div className="flex flex-col gap-2">
                    {/* Social Links as "Settings" or similar extras */}
                    <a
                        href="https://wa.me/573001234567"
                        target="_blank"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                    >
                        <span className="material-symbols-outlined group-hover:text-primary transition-colors">chat</span>
                        <span className="text-sm font-medium">Soporte WhatsApp</span>
                    </a>

                    <div className="flex items-center gap-3 px-3 py-3 mt-2 border-t border-gray-100 dark:border-gray-800">
                        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex items-center justify-center text-gray-500">
                            {/* Avatar placeholder if no image */}
                            <span className="material-symbols-outlined text-lg">person</span>
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.name || 'Usuario'}</p>
                            <p className="text-xs text-secondary dark:text-gray-400">
                                {user?.role === 'admin' ? 'Administrador' : 'Mayorista'}
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            title="Cerrar Sesión"
                        >
                            <span className="material-symbols-outlined">logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
