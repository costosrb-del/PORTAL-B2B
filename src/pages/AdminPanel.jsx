import { useState, useEffect } from 'react';
import {
    Plus, Edit2, Trash2, Upload, FileText, Search, MoreVertical, Loader,
    Newspaper, Calendar, Users, Key, Megaphone, Image as ImageIcon, Link as LinkIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Tabs from '../components/ui/Tabs';
import ProductFormModal from '../components/modals/ProductFormModal';
import DocumentUploadModal from '../components/modals/DocumentUploadModal';
import NewsFormModal from '../components/modals/NewsFormModal';
import {
    getProducts, deleteProduct,
    getNews, deleteNews,
    getBanners, createBanner, deleteBanner,
    getContracts, getPrices
} from '../services/dataService';

const AdminPanel = () => {
    // Modal States
    const [showProductModal, setShowProductModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showNewsModal, setShowNewsModal] = useState(false);
    const [uploadType, setUploadType] = useState('contract');

    // Data States
    const [products, setProducts] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [prices, setPrices] = useState([]);
    const [news, setNews] = useState([]);
    const [banners, setBanners] = useState([]); // New Data State
    const [usersList, setUsersList] = useState([]);

    const [loadingProducts, setLoadingProducts] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedNews, setSelectedNews] = useState(null);

    const { getAllUsers, registerUser } = useAuth();

    // --- FETCH FUNCTIONS ---
    const loadAllData = async () => {
        setLoadingProducts(true);
        const [prodData, newsData, bannerData, contractData, priceData] = await Promise.all([
            getProducts(),
            getNews(),
            getBanners(),
            getContracts(),
            getPrices()
        ]);
        setProducts(prodData);
        setNews(newsData);
        setBanners(bannerData);
        setContracts(contractData);
        setPrices(priceData);
        setUsersList(getAllUsers());
        setLoadingProducts(false);
    };

    useEffect(() => {
        loadAllData();
    }, []);

    // --- HANDLERS (Using dataService for Demo) ---

    // Products
    const handleDeleteProduct = async (id) => {
        if (window.confirm('¿Eliminar producto?')) {
            await deleteProduct(id);
            loadAllData();
        }
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setShowProductModal(true);
    };

    // News
    const handleDeleteNews = async (id) => {
        if (window.confirm('¿Eliminar noticia?')) {
            await deleteNews(id);
            loadAllData();
        }
    };

    const handleEditNews = (newsItem) => {
        setSelectedNews(newsItem);
        setShowNewsModal(true);
    };

    // Banners
    const handleDeleteBanner = async (id) => {
        if (window.confirm('¿Eliminar banner?')) {
            await deleteBanner(id);
            loadAllData();
        }
    };

    // --- MANAGERS ---

    const BannersManager = () => {
        const [newBanner, setNewBanner] = useState({ title: '', description: '', imageUrl: '', link: '' });

        const handleSubmit = async (e) => {
            e.preventDefault();
            await createBanner(newBanner);
            setNewBanner({ title: '', description: '', imageUrl: '', link: '' });
            loadAllData();
            alert('Banner publicado exitosamente');
        };

        return (
            <div className="space-y-8">
                {/* Create Banner Form */}
                <div className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-xl border border-emerald-100 shadow-sm">
                    <h3 className="text-lg font-bold text-emerald-800 mb-4 flex items-center gap-2">
                        <Megaphone className="w-5 h-5" />
                        Publicar Nuevo Banner
                    </h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Título del Banner</label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                placeholder="Ej: ¡Oferta de Verano!"
                                required
                                value={newBanner.title}
                                onChange={e => setNewBanner({ ...newBanner, title: e.target.value })}
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción Corta</label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                placeholder="Ej: 20% de descuento en todos los kits"
                                value={newBanner.description}
                                onChange={e => setNewBanner({ ...newBanner, description: e.target.value })}
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL de la Imagen (Horizontal)</label>
                            <div className="flex gap-2">
                                <ImageIcon className="w-5 h-5 text-gray-400 mt-2" />
                                <input
                                    type="url"
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                    placeholder="https://..."
                                    required
                                    value={newBanner.imageUrl}
                                    onChange={e => setNewBanner({ ...newBanner, imageUrl: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Enlace de Destino (Opcional)</label>
                            <div className="flex gap-2">
                                <LinkIcon className="w-5 h-5 text-gray-400 mt-2" />
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                    placeholder="/marketing/producto-1 o https://externo.com"
                                    value={newBanner.link}
                                    onChange={e => setNewBanner({ ...newBanner, link: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="col-span-2 flex justify-end mt-2">
                            <Button variant="primary" type="submit">
                                Publicar Banner en Dashboard
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Active Banners List */}
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Banners Activos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {banners.map((banner) => (
                            <div key={banner.id} className="relative group overflow-hidden rounded-lg border border-gray-200">
                                <img src={banner.imageUrl} alt={banner.title} className="w-full h-40 object-cover" />
                                <div className="p-4 bg-white">
                                    <h4 className="font-bold text-gray-800">{banner.title}</h4>
                                    <p className="text-sm text-gray-500">{banner.description}</p>
                                    <div className="mt-2 text-xs text-blue-600 truncate">{banner.link}</div>
                                </div>
                                <button
                                    onClick={() => handleDeleteBanner(banner.id)}
                                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                                    title="Eliminar Banner"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // Reuse existing managers structure with dynamic data
    const ProductsManager = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input type="text" placeholder="Buscar productos..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500" />
                </div>
                <Button variant="primary" icon={Plus} onClick={() => setShowProductModal(true)}>Nuevo Producto</Button>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loadingProducts ? <tr><td colSpan="3" className="p-4 text-center">Cargando...</td></tr> :
                            products.map(product => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 flex items-center gap-4">
                                        <img src={product.images?.[0]} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                                        <div>
                                            <div className="font-medium text-gray-900">{product.name}</div>
                                            <div className="text-sm text-gray-500 truncate w-48">{product.description}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{product.category}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <button onClick={() => handleEditProduct(product)} className="text-gray-400 hover:text-emerald-600"><Edit2 className="w-4 h-4" /></button>
                                        <button onClick={() => handleDeleteProduct(product.id)} className="text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const NewsManager = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Noticias Publicadas</h3>
                <Button variant="primary" icon={Plus} onClick={() => setShowNewsModal(true)}>Nueva Noticia</Button>
            </div>
            <div className="space-y-4">
                {news.map(item => (
                    <Card key={item.id} className="p-4 flex gap-4">
                        <img src={item.imageUrl} className="w-24 h-24 rounded-lg object-cover bg-gray-100" />
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900">{item.title}</h4>
                            <p className="text-sm text-gray-600 line-clamp-2">{item.content}</p>
                            <div className="flex gap-2 mt-2">
                                <button onClick={() => handleEditNews(item)} className="text-sm text-blue-600 hover:underline">Editar</button>
                                <button onClick={() => handleDeleteNews(item.id)} className="text-sm text-red-600 hover:underline">Eliminar</button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );

    const UsersManager = () => {
        const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });

        const handleCreate = async (e) => {
            e.preventDefault();
            await registerUser(newUser);
            setUsersList(getAllUsers());
            setNewUser({ name: '', email: '', password: '' });
            alert('Usuario creado');
        };

        return (
            <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2"><Users className="w-5 h-5" /> Crear Cliente Mayorista</h3>
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <input value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} placeholder="Nombre Empresa" className="px-3 py-2 border rounded-lg" required />
                        <input value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} placeholder="Email" className="px-3 py-2 border rounded-lg" required />
                        <div className="flex gap-2">
                            <input value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} placeholder="Contraseña" className="px-3 py-2 border rounded-lg w-full" required />
                            <button type="button" onClick={() => setNewUser({ ...newUser, password: Math.random().toString(36).slice(-8) })} className="p-2 bg-gray-200 rounded"><Key className="w-5 h-5" /></button>
                        </div>
                        <Button variant="primary" type="submit" className="md:col-span-3">Crear Usuario</Button>
                    </form>
                </div>
                <div>
                    <h3 className="font-medium mb-4">Lista de Usuarios</h3>
                    <div className="bg-white border rounded-lg overflow-hidden">
                        {usersList.map((u, i) => (
                            <div key={i} className="p-4 border-b last:border-0 flex justify-between items-center hover:bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">{u.name[0]}</div>
                                    <div>
                                        <div className="font-medium">{u.name}</div>
                                        <div className="text-xs text-gray-500">{u.email}</div>
                                    </div>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{u.role}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const tabs = [
        { label: '📢 Banners', content: <BannersManager /> },
        { label: '📦 Productos', content: <ProductsManager /> },
        { label: '📰 Noticias', content: <NewsManager /> },
        { label: '👥 Usuarios', content: <UsersManager /> },
    ];

    return (
        <div className="max-w-7xl mx-auto pb-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
                <p className="text-gray-600">Control total sobre el ecosistema B2B.</p>
            </div>

            <Card className="p-6">
                <Tabs tabs={tabs} />
            </Card>

            <ProductFormModal isOpen={showProductModal} onClose={() => setShowProductModal(false)} product={selectedProduct} onSaveSuccess={loadAllData} />
            <NewsFormModal isOpen={showNewsModal} onClose={() => setShowNewsModal(false)} news={selectedNews} onSaveSuccess={loadAllData} />
            <DocumentUploadModal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} type={uploadType} />
        </div>
    );
};

export default AdminPanel;
