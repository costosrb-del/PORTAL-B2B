import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getNews } from '../services/dataService'; // Use news instead of resources for "Updates"
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 50));
        const data = await getNews();
        setNews(data.slice(0, 3)); // Only show top 3 updates
        setLoading(false);
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* 1. Welcome Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 to-emerald-600 p-8 sm:p-10 text-white shadow-xl">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight">
                            Hola, {user?.name?.split(' ')[0] || 'Usuario'} 👋
                        </h1>
                        <p className="text-emerald-100 text-lg max-w-xl font-light">
                            Bienvenido al ecosistema de origen botánico. ¿Qué deseas gestionar hoy?
                        </p>
                    </div>
                    {/* Decorative Logo Watermark */}
                    <div className="hidden md:block opacity-20 transform translate-x-4">
                        <span className="material-symbols-outlined text-[120px]">eco</span>
                    </div>
                </div>
                {/* Abstract Shapes */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white opacity-5 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-emerald-400 opacity-10 blur-2xl"></div>
            </div>

            {/* 2. Main Action Grid (Navigation) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Catálogo */}
                <Link to="/marketing" className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-emerald-100 hover:-translate-y-1 transition-all duration-300">
                    <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl">inventory_2</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Catálogo Digital</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Explora nuestros productos, fichas técnicas y videos educativos.
                        </p>
                    </div>
                </Link>

                {/* Lista de Precios */}
                <Link to="/precios" className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300">
                    <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl">payments</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Lista de Precios</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Consulta y descarga las listas de precios actualizadas del mes.
                        </p>
                    </div>
                </Link>

                {/* Recursos Marketing */}
                <Link to="/noticias" className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-purple-100 hover:-translate-y-1 transition-all duration-300">
                    <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl">campaign</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Marketing & News</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Descubre las últimas novedades, lanzamientos y material promocional.
                        </p>
                    </div>
                </Link>
            </div>

            {/* 3. External Tools (Billing & PQRS) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* COMPRA AHORA (Prominent - Spans 2 cols on LG) */}
                <a
                    href="https://portal-facturacion.com"
                    target="_blank"
                    rel="noreferrer"
                    className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 group"
                >
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm mb-4 border border-white/10">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                <span className="text-xs font-semibold tracking-wider">PORTAL DE PAGOS</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Compra Ahora</h3>
                            <p className="text-gray-400 max-w-md">
                                Accede directamente a nuestra plataforma de facturación para realizar tus pedidos de forma segura.
                            </p>
                        </div>
                        <div className="flex-shrink-0 bg-white text-gray-900 w-16 h-16 rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                            <span className="material-symbols-outlined text-3xl">shopping_cart_checkout</span>
                        </div>
                    </div>
                </a>

                {/* PQRS (Secondary) */}
                <a
                    href="https://pqrs-system.com"
                    target="_blank"
                    rel="noreferrer"
                    className="relative overflow-hidden rounded-2xl bg-white border-2 border-dashed border-gray-200 p-8 flex flex-col justify-center items-center text-center hover:border-emerald-400 hover:bg-emerald-50/30 transition-all duration-300 group"
                >
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-500 group-hover:text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                        <span className="material-symbols-outlined text-2xl">support_agent</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Centro de Ayuda (PQRS)</h3>
                    <p className="text-xs text-gray-500">¿Tienes dudas o sugerencias?</p>
                </a>
            </div>

            {/* 4. Recent Updates (Subtle) */}
            <div className="pt-8 border-t border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                        Últimas Actualizaciones
                    </h2>
                    <Link to="/noticias" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                        Ver todo
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {loading ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse"></div>
                        ))
                    ) : (
                        news.map(item => (
                            <Link key={item.id} to="/noticias" className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0 shadow-sm"
                                />
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1">{item.title}</h4>
                                    <p className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
