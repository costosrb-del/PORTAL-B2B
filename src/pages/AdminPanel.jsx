import { useState, useEffect } from 'react';
import {
    Plus,
    Edit2,
    Trash2,
    Upload,
    FileText,
    Search,
    MoreVertical,
    Loader,
    Newspaper,
    Calendar,
    Users,
    Key
} from 'lucide-react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext'; // Import Auth Context
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Tabs from '../components/ui/Tabs';
import ProductFormModal from '../components/modals/ProductFormModal';
import DocumentUploadModal from '../components/modals/DocumentUploadModal';
import NewsFormModal from '../components/modals/NewsFormModal';

const AdminPanel = () => {
    const [showProductModal, setShowProductModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showNewsModal, setShowNewsModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false); // New User Modal State
    const [uploadType, setUploadType] = useState('contract');

    const [products, setProducts] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [prices, setPrices] = useState([]);
    const [news, setNews] = useState([]);
    const [usersList, setUsersList] = useState([]); // Users List State

    const [loadingProducts, setLoadingProducts] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedNews, setSelectedNews] = useState(null);

    // Auth Context functions
    const { getAllUsers, registerUser } = useAuth();

    // Fetch functions...
    const fetchProducts = async () => {
        setLoadingProducts(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'products'));
            const productsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProducts(productsList);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoadingProducts(false);
        }
    };

    const fetchContracts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'contracts'));
            const list = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setContracts(list);
        } catch (error) {
            console.error("Error fetching contracts:", error);
        }
    };

    const fetchPrices = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'prices'));
            const list = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            list.sort((a, b) => b.updatedAt?.seconds - a.updatedAt?.seconds);
            setPrices(list);
        } catch (error) {
            console.error("Error fetching prices:", error);
        }
    };

    const fetchNews = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'news'));
            const list = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            list.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
            setNews(list);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    const fetchUsers = () => {
        const users = getAllUsers();
        setUsersList(users);
    };

    useEffect(() => {
        fetchProducts();
        fetchContracts();
        fetchPrices();
        fetchNews();
        fetchUsers();
    }, []);

    // ... Delete handlers ...
    const handleDeleteProduct = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            try {
                await deleteDoc(doc(db, 'products', id));
                fetchProducts();
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Error al eliminar el producto");
            }
        }
    };

    const handleDeleteNews = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta noticia?')) {
            try {
                await deleteDoc(doc(db, 'news', id));
                fetchNews();
            } catch (error) {
                console.error("Error deleting news:", error);
                alert("Error al eliminar la noticia");
            }
        }
    };

    // ... Edit handlers ...
    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setShowProductModal(true);
    };

    const handleEditNews = (newsItem) => {
        setSelectedNews(newsItem);
        setShowNewsModal(true);
    };

    // ... Modal close handlers ...
    const handleCloseProductModal = () => {
        setShowProductModal(false);
        setSelectedProduct(null);
    };

    const handleCloseNewsModal = () => {
        setShowNewsModal(false);
        setSelectedNews(null);
    };

    const handleOpenUpload = (type) => {
        setUploadType(type);
        setShowUploadModal(true);
    };

    const handleUploadSuccess = () => {
        if (uploadType === 'contract') fetchContracts();
        else fetchPrices();
    };

    // --- USERS MANAGER COMPONENT ---
    const UsersManager = () => {
        const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
        const [error, setError] = useState('');
        const [success, setSuccess] = useState('');

        const handleCreateUser = async (e) => {
            e.preventDefault();
            setError('');
            setSuccess('');

            if (newUser.password.length < 6) {
                setError('La contraseña debe tener al menos 6 caracteres');
                return;
            }

            const result = await registerUser(newUser);
            if (result.success) {
                setSuccess(`Usuario creado. Credenciales: ${newUser.email} / ${newUser.password}`);
                setNewUser({ name: '', email: '', password: '' });
                fetchUsers(); // Refresh list
            } else {
                setError(result.error);
            }
        };

        return (
            <div className="space-y-8">
                {/* Create User Form */}
                <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200">
                    <h3 className="text-lg font-medium text-neutral-900 mb-4 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-secondary-600" />
                        Crear Nuevo Cliente B2B
                    </h3>

                    {error && <div className="mb-4 text-red-600 text-sm bg-red-50 p-2 rounded">{error}</div>}
                    {success && <div className="mb-4 text-green-600 text-sm bg-green-50 p-2 rounded font-medium">{success}</div>}

                    <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Nombre Empresa/Cliente</label>
                            <input
                                type="text"
                                value={newUser.name}
                                onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-500 outline-none"
                                placeholder="Ej. Distribuidora XYZ"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Correo Electrónico</label>
                            <input
                                type="email"
                                value={newUser.email}
                                onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-500 outline-none"
                                placeholder="cliente@empresa.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Contraseña Temporal</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newUser.password}
                                    onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-500 outline-none font-mono"
                                    placeholder="Generar o escribir..."
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setNewUser({ ...newUser, password: Math.random().toString(36).slice(-8) })}
                                    className="p-2 bg-neutral-200 rounded-lg hover:bg-neutral-300"
                                    title="Generar contraseña"
                                >
                                    <Key className="w-5 h-5 text-neutral-600" />
                                </button>
                            </div>
                        </div>
                        <div className="md:col-span-3 flex justify-end mt-2">
                            <Button variant="primary" type="submit">
                                Crear Cliente
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Users List */}
                <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-4">Usuarios Registrados</h3>
                    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-neutral-50 border-b border-neutral-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Usuario</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Rol</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200">
                                {usersList.map((user, index) => (
                                    <tr key={index} className="hover:bg-neutral-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-700 font-bold mr-3">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-neutral-900">{user.name}</div>
                                                    <div className="text-sm text-neutral-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                                {user.role === 'admin' ? 'Administrador' : 'Cliente B2B'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.mustChangePassword ? (
                                                <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded border border-orange-200">
                                                    Pendiente Cambio Clave
                                                </span>
                                            ) : (
                                                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded border border-green-200">
                                                    Activo
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    // --- EXISTING MANAGERS (Products, Contracts, Prices, News) ---
    const ProductsManager = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500"
                    />
                </div>
                <Button variant="primary" icon={Plus} onClick={() => setShowProductModal(true)}>
                    Nuevo Producto
                </Button>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-neutral-50 border-b border-neutral-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Producto</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Categoría</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Recursos</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                        {loadingProducts ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-neutral-500">
                                    <div className="flex justify-center items-center gap-2">
                                        <Loader className="w-5 h-5 animate-spin" /> Cargando productos...
                                    </div>
                                </td>
                            </tr>
                        ) : products.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-neutral-500">
                                    No hay productos registrados.
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id} className="hover:bg-neutral-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0">
                                                <img
                                                    className="h-10 w-10 rounded-lg object-cover bg-neutral-100"
                                                    src={product.images?.[0] || 'https://via.placeholder.com/40'}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-neutral-900">{product.name}</div>
                                                <div className="text-sm text-neutral-500 truncate max-w-xs">{product.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-secondary-100 text-secondary-800">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                                        <div className="flex gap-2">
                                            {product.videos?.length > 0 && <span title="Videos">📹 {product.videos.length}</span>}
                                            {product.manuals?.length > 0 && <span title="Manuales">📄 {product.manuals.length}</span>}
                                            {product.images?.length > 0 && <span title="Fotos">📸 {product.images.length}</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                className="text-secondary-600 hover:text-secondary-900 p-1"
                                                onClick={() => handleEditProduct(product)}
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-900 p-1"
                                                onClick={() => handleDeleteProduct(product.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const ContractsManager = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-neutral-900">Documentos Legales Vigentes</h3>
                <Button variant="primary" icon={Upload} onClick={() => handleOpenUpload('contract')}>
                    Subir Nuevo Contrato
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contracts.length === 0 ? (
                    <p className="text-neutral-500 col-span-2 text-center py-8">No hay contratos subidos.</p>
                ) : (
                    contracts.map((contract) => (
                        <Card key={contract.id} className="p-4 flex items-start justify-between">
                            <div className="flex gap-3">
                                <div className="p-2 bg-neutral-100 rounded-lg">
                                    <FileText className="w-6 h-6 text-neutral-600" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-neutral-900">{contract.title}</h4>
                                    <p className="text-sm text-neutral-500">
                                        Actualizado: {contract.updatedAt?.toDate ? contract.updatedAt.toDate().toLocaleDateString() : 'N/A'}
                                    </p>
                                    <div className="mt-2 flex gap-2">
                                        <span className="text-xs bg-neutral-100 px-2 py-1 rounded text-neutral-600">
                                            {contract.category}
                                        </span>
                                        {contract.isNew && (
                                            <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded">
                                                Notificando a usuarios
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button className="text-neutral-400 hover:text-neutral-600">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );

    const PricesManager = () => (
        <div className="max-w-2xl mx-auto text-center space-y-8 py-8">
            <div
                className="border-2 border-dashed border-neutral-300 rounded-xl p-12 hover:border-secondary-500 hover:bg-secondary-50 transition-colors cursor-pointer"
                onClick={() => handleOpenUpload('price')}
            >
                <div className="w-16 h-16 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">
                    Actualizar Lista de Precios
                </h3>
                <p className="text-neutral-500 mb-6">
                    Haz clic para subir un nuevo archivo PDF
                </p>
                <Button variant="secondary">
                    Seleccionar Archivo
                </Button>
            </div>

            <div className="text-left">
                <h4 className="font-medium text-neutral-900 mb-4">Historial de Actualizaciones</h4>
                <div className="space-y-3">
                    {prices.length === 0 ? (
                        <p className="text-neutral-500 text-center">No hay historial de precios.</p>
                    ) : (
                        prices.map((price) => (
                            <div key={price.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-neutral-400" />
                                    <div>
                                        <p className="text-sm font-medium text-neutral-900">{price.fileName}</p>
                                        <p className="text-xs text-neutral-500">
                                            Subido el {price.updatedAt?.toDate ? price.updatedAt.toDate().toLocaleDateString() : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                                <a href={price.url} target="_blank" rel="noopener noreferrer">
                                    <Button variant="ghost" size="sm">Descargar</Button>
                                </a>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );

    const NewsManager = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-neutral-900">Gestión de Noticias</h3>
                <Button variant="primary" icon={Plus} onClick={() => setShowNewsModal(true)}>
                    Nueva Noticia
                </Button>
            </div>

            <div className="space-y-4">
                {news.length === 0 ? (
                    <p className="text-neutral-500 text-center py-8">No hay noticias publicadas.</p>
                ) : (
                    news.map((newsItem) => (
                        <Card key={newsItem.id} className="p-4">
                            <div className="flex gap-4">
                                {newsItem.imageUrl && (
                                    <img
                                        src={newsItem.imageUrl}
                                        alt={newsItem.title}
                                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                                    />
                                )}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="font-semibold text-neutral-900">{newsItem.title}</h4>
                                            <p className="text-sm text-neutral-600 mt-1 line-clamp-2">{newsItem.content}</p>
                                            <div className="flex items-center gap-3 mt-2 text-xs text-neutral-500">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {newsItem.createdAt?.toDate ? newsItem.createdAt.toDate().toLocaleDateString() : 'N/A'}
                                                </span>
                                                {newsItem.isNew && (
                                                    <span className="px-2 py-0.5 bg-secondary-100 text-secondary-700 rounded-full">
                                                        Nuevo
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                className="text-secondary-600 hover:text-secondary-900 p-1"
                                                onClick={() => handleEditNews(newsItem)}
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-900 p-1"
                                                onClick={() => handleDeleteNews(newsItem.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );

    const tabs = [
        { label: '📦 Productos', content: <ProductsManager /> },
        { label: '⚖️ Contratos', content: <ContractsManager /> },
        { label: '💲 Precios', content: <PricesManager /> },
        { label: '📰 Noticias', content: <NewsManager /> },
        { label: '👥 Usuarios', content: <UsersManager /> }, // New Tab
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-neutral-900 mb-2">
                    Panel de Administración
                </h1>
                <p className="text-neutral-600">
                    Gestiona todo el contenido de la plataforma desde aquí
                </p>
            </div>

            <Card className="p-6">
                <Tabs tabs={tabs} />
            </Card>

            <ProductFormModal
                isOpen={showProductModal}
                onClose={handleCloseProductModal}
                product={selectedProduct}
                onSaveSuccess={fetchProducts}
            />

            <DocumentUploadModal
                isOpen={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                type={uploadType}
                onUploadSuccess={handleUploadSuccess}
            />

            <NewsFormModal
                isOpen={showNewsModal}
                onClose={handleCloseNewsModal}
                news={selectedNews}
                onSaveSuccess={fetchNews}
            />
        </div>
    );
};

export default AdminPanel;
