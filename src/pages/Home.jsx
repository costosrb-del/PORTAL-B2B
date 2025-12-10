import { Link } from 'react-router-dom';
import WelcomeModal from '../components/modals/WelcomeModal';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="flex flex-col gap-8">
            {/* Welcome Banner */}
            <section>
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0b3d2b] to-[#14b866] dark:from-[#052016] dark:to-[#0e8046] shadow-lg">
                    {/* Abstract decorative circle */}
                    <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between p-8 gap-6">
                        <div className="flex flex-col gap-2 max-w-2xl">
                            <h2 className="text-white text-3xl font-bold tracking-tight">Bienvenido, {user?.name?.split(' ')[0] || 'Usuario'}</h2>
                            <p className="text-green-50 text-base md:text-lg opacity-90">
                                Aquí están las novedades de tu red de distribución hoy. Consulta las últimas actualizaciones del catálogo.
                            </p>
                        </div>
                        <Link to="/marketing" className="shrink-0 flex items-center justify-center gap-2 bg-white text-primary hover:bg-gray-50 font-bold py-2.5 px-6 rounded-xl shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0">
                            <span>Ver Catálogo</span>
                            <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* KPI Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Stat 1 */}
                <div className="bg-white dark:bg-[#1a2e26] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between group hover:border-primary/30 transition-colors">
                    <div className="flex flex-col gap-1">
                        <p className="text-secondary dark:text-gray-400 text-sm font-medium">Nuevos Productos</p>
                        <p className="text-gray-900 dark:text-white text-3xl font-bold">12</p>
                        <p className="text-xs text-primary font-medium flex items-center gap-1 mt-1">
                            <span className="material-symbols-outlined text-sm">trending_up</span>
                            +2 esta semana
                        </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <span className="material-symbols-outlined">inventory_2</span>
                    </div>
                </div>

                {/* Stat 2 */}
                <div className="bg-white dark:bg-[#1a2e26] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between group hover:border-primary/30 transition-colors">
                    <div className="flex flex-col gap-1">
                        <p className="text-secondary dark:text-gray-400 text-sm font-medium">Descargas Mensuales</p>
                        <p className="text-gray-900 dark:text-white text-3xl font-bold">1.2k</p>
                        <p className="text-xs text-primary font-medium flex items-center gap-1 mt-1">
                            <span className="material-symbols-outlined text-sm">trending_up</span>
                            +15% vs mes pasado
                        </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <span className="material-symbols-outlined">cloud_download</span>
                    </div>
                </div>

                {/* Stat 3 */}
                <div className="bg-white dark:bg-[#1a2e26] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between group hover:border-primary/30 transition-colors">
                    <div className="flex flex-col gap-1">
                        <p className="text-secondary dark:text-gray-400 text-sm font-medium">Videos de Capacitación</p>
                        <p className="text-gray-900 dark:text-white text-3xl font-bold">5</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1 mt-1">
                            Disponibles ahora
                        </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <span className="material-symbols-outlined">play_circle</span>
                    </div>
                </div>
            </section>

            {/* Recent Updates */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Actualizaciones Recientes</h3>
                    <Link to="/noticias" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors flex items-center gap-1">
                        Ver todo
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Update Card 1 - Specs */}
                    <div className="group flex flex-col bg-white dark:bg-[#1a2e26] rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-800 transition-all hover:-translate-y-1">
                        <div className="h-32 bg-gray-100 dark:bg-gray-800 bg-cover bg-center relative" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800")' }}>
                            <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                                Ficha Técnica
                            </div>
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">Especificaciones Solares Q3</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">Detalles técnicos de la nueva serie residencial.</p>
                            <div className="mt-auto flex items-center justify-between">
                                <span className="text-xs text-gray-400">24 Oct, 2024</span>
                                <button className="text-primary hover:text-primary-dark p-1 rounded hover:bg-primary/10 transition-colors">
                                    <span className="material-symbols-outlined">download</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Update Card 2 - News */}
                    <Link to="/noticias" className="group flex flex-col bg-white dark:bg-[#1a2e26] rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-800 transition-all hover:-translate-y-1">
                        <div className="h-32 bg-gray-100 dark:bg-gray-800 bg-cover bg-center relative" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800")' }}>
                            <div className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white uppercase tracking-wide">
                                Noticia
                            </div>
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">Cumbre Anual de Socios</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">Registro abierto para la cumbre global 2025.</p>
                            <div className="mt-auto flex items-center justify-between">
                                <span className="text-xs text-gray-400">22 Oct, 2024</span>
                                <div className="text-primary hover:text-primary-dark p-1 rounded hover:bg-primary/10 transition-colors">
                                    <span className="material-symbols-outlined">visibility</span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Update Card 3 - Video */}
                    <div className="group flex flex-col bg-white dark:bg-[#1a2e26] rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-800 transition-all hover:-translate-y-1">
                        <div className="h-32 bg-gray-100 dark:bg-gray-800 bg-cover bg-center relative" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800")' }}>
                            <div className="absolute top-2 right-2 bg-red-500/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white uppercase tracking-wide flex items-center gap-1">
                                <span className="material-symbols-outlined text-[10px]">play_arrow</span> Video
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                                <div className="h-10 w-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="material-symbols-outlined text-primary">play_arrow</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">Guía de Instalación</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">Tutorial paso a paso para la nueva serie X.</p>
                            <div className="mt-auto flex items-center justify-between">
                                <span className="text-xs text-gray-400">20 Oct, 2024</span>
                                <button className="text-primary hover:text-primary-dark p-1 rounded hover:bg-primary/10 transition-colors">
                                    <span className="material-symbols-outlined">share</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Update Card 4 - Price List */}
                    <Link to="/precios" className="group flex flex-col bg-white dark:bg-[#1a2e26] rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-800 transition-all hover:-translate-y-1">
                        <div className="h-32 bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center relative">
                            <span className="material-symbols-outlined text-6xl text-emerald-200 dark:text-emerald-800">table_chart</span>
                            <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                                XLSX
                            </div>
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">Lista de Precios Q4</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">Precios actualizados efectivos el 1 de Nov.</p>
                            <div className="mt-auto flex items-center justify-between">
                                <span className="text-xs text-gray-400">18 Oct, 2024</span>
                                <div className="text-primary hover:text-primary-dark p-1 rounded hover:bg-primary/10 transition-colors">
                                    <span className="material-symbols-outlined">download</span>
                                </div>
                            </div>
                        </div>
                    </Link>

                </div>
            </section>

            <WelcomeModal />
        </div>
    );
};

export default Home;
