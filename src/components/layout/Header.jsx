import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import clsx from 'clsx';

const Header = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // Breadcrumbs Logic
    const getPathName = (path) => {
        switch (path) {
            case 'dashboard': return 'Dashboard';
            case 'marketing': return 'Marketing';
            case 'precios': return 'Precios';
            case 'contratos': return 'Contratos';
            case 'noticias': return 'Noticias';
            case 'admin': return 'Administración';
            default: return path;
        }
    };

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const currentPage = pathSegments.length > 0 ? getPathName(pathSegments[0]) : 'Dashboard';

    useEffect(() => {
        if (searchQuery.trim().length > 2) {
            performSearch(searchQuery);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const performSearch = async (query) => {
        setIsSearching(true);
        const results = [];
        const lowerQuery = query.toLowerCase();

        try {
            // Search Products
            const productsSnapshot = await getDocs(collection(db, 'products'));
            productsSnapshot.docs.forEach(doc => {
                const data = doc.data();
                if (data.name?.toLowerCase().includes(lowerQuery) ||
                    data.description?.toLowerCase().includes(lowerQuery)) {
                    results.push({
                        id: doc.id,
                        type: 'product',
                        icon: 'inventory_2',
                        title: data.name,
                        subtitle: data.category,
                        path: `/marketing/${doc.id}`
                    });
                }
            });

            // Search News
            const newsSnapshot = await getDocs(collection(db, 'news'));
            newsSnapshot.docs.forEach(doc => {
                const data = doc.data();
                if (data.title?.toLowerCase().includes(lowerQuery)) {
                    results.push({
                        id: doc.id,
                        type: 'news',
                        icon: 'campaign',
                        title: data.title,
                        subtitle: 'Noticia',
                        path: '/noticias'
                    });
                }
            });

            // Search Contracts
            const contractsSnapshot = await getDocs(collection(db, 'contracts'));
            contractsSnapshot.docs.forEach(doc => {
                const data = doc.data();
                if (data.title?.toLowerCase().includes(lowerQuery)) {
                    results.push({
                        id: doc.id,
                        type: 'contract',
                        icon: 'description',
                        title: data.title,
                        subtitle: 'Contrato',
                        path: '/contratos'
                    });
                }
            });

            setSearchResults(results.slice(0, 8));
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleResultClick = (result) => {
        navigate(result.path);
        setSearchQuery('');
        setSearchResults([]);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
    };

    return (
        <header className="h-16 flex items-center justify-between px-6 py-4 bg-background-light dark:bg-background-dark z-10 sticky top-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                {/* Mobile Menu Button (Placeholder) */}
                <button className="md:hidden p-2 text-gray-600 dark:text-gray-300">
                    <span className="material-symbols-outlined">menu</span>
                </button>
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm">
                    <Link to="/dashboard" className="text-secondary dark:text-secondary hover:text-primary transition-colors">Home</Link>
                    <span className="text-gray-300 dark:text-gray-600">/</span>
                    <span className="text-gray-900 dark:text-white font-medium capitalize">{currentPage}</span>
                </div>
            </div>

            {/* Search Bar */}
            <div className="hidden sm:flex flex-1 max-w-md mx-6 relative">
                <div className="relative w-full group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-secondary dark:text-gray-500 group-focus-within:text-primary transition-colors">search</span>
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-10 py-2 border-none rounded-xl bg-white dark:bg-[#1a2e26] text-gray-900 dark:text-white placeholder-secondary/70 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm sm:text-sm transition-all"
                        placeholder="Buscar recursos, productos o archivos..."
                    />
                    {searchQuery && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                    )}
                </div>

                {/* Search Results Dropdown */}
                {searchResults.length > 0 && (
                    <div className="absolute top-full mt-2 w-full bg-white dark:bg-[#1a2e26] border border-gray-100 dark:border-gray-800 rounded-xl shadow-lg max-h-96 overflow-y-auto z-50">
                        {searchResults.map((result) => (
                            <button
                                key={`${result.type}-${result.id}`}
                                onClick={() => handleResultClick(result)}
                                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left border-b border-gray-50 dark:border-gray-800 last:border-b-0"
                            >
                                <div className="w-8 h-8 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0 text-primary">
                                    <span className="material-symbols-outlined text-sm">{result.icon}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 dark:text-white truncate">{result.title}</p>
                                    <p className="text-xs text-secondary dark:text-gray-400">{result.subtitle}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
                <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-[#112119]"></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
